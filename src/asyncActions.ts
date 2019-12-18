import { AnyAction, createStore } from 'redux'
import { ActionCreator, isActionOf } from 'typesafe-actions'
import { StandaloneStore } from '.'

interface IResolve<TState> {
  action: AnyAction
  state: TState
}

export const dispatchActionsAndWaitResponse = <TState, TSelectorResponse>({
  actionsDispatch,
  actionCreatorsResolve,
  store,
  selector,
}: {
  store: ReturnType<typeof createStore>
  actionsDispatch: AnyAction[]
  actionCreatorsResolve: ActionCreator[]
  selector: (state: TState) => TSelectorResponse
}) => {
  const standaloneStore = new StandaloneStore<TState>({ store })

  return !actionsDispatch.length
    ? Promise.reject('You should at least give one action.')
    : new Promise((resolve: ({ action, state }: IResolve<TState>) => void) => {
        actionCreatorsResolve.forEach(actionResolve => {
          standaloneStore.subscribe((action, state) => {
            if (isActionOf(actionResolve, action)) {
              resolve({ action, state })
            }
          })
        })
        actionsDispatch.forEach(action => {
          standaloneStore.dispatchAction(action)
        })
      }).then(({ state }: { state: TState }) => {
        standaloneStore.listenersClear()
        return selector(state)
      })
}

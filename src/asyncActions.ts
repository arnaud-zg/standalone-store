import { AnyAction, createStore } from 'redux'
import { StandaloneStore } from '.'

interface IResolve<TState> {
  action: AnyAction
  state: TState
}

export const dispatchActionsAndWaitResponse = <TState, TSelectorResponse>({
  actions,
  store,
  selector,
}: {
  store: ReturnType<typeof createStore>
  actions: AnyAction[]
  selector: (state: TState) => TSelectorResponse
}) => {
  const standaloneStore = new StandaloneStore<TState>({ store })

  return !actions.length
    ? Promise.reject('You should at least give one action.')
    : new Promise((resolve: ({ action, state }: IResolve<TState>) => void) => {
        const lastAction = actions[actions.length - 1]
        standaloneStore.subscribe((action, state) => {
          if (action && action.type === lastAction.type) {
            resolve({ action, state })
          }
        })
        actions.forEach(action => {
          standaloneStore.dispatchAction(action)
        })
      }).then(({ state }: { state: TState }) => {
        standaloneStore.listenersPop()
        return selector(state)
      })
}

import {
  AnyAction,
  Dispatch,
  Middleware,
  MiddlewareAPI,
  StoreCreator,
} from 'redux'

type Listener<TStoreState> = (action: AnyAction, state: TStoreState) => void

type ConfigureStore = ({
  middlewares,
}: {
  middlewares: Middleware[]
}) => ReturnType<StoreCreator>

export class StandaloneStore<TStoreState> {
  private listeners: Listener<TStoreState>[] = []
  private store: ReturnType<StoreCreator>

  constructor({ configureStore }: { configureStore: ConfigureStore }) {
    this.store = configureStore({ middlewares: [this.afterActionMiddleware] })
  }

  dispatchAction = (action: AnyAction) => {
    this.store.dispatch(action)
  }

  afterActionMiddleware = (store: MiddlewareAPI) => (
    next: Dispatch<AnyAction>
  ) => (action: AnyAction) => {
    const actionToDispatch = next(action)

    if (this.listeners.length) {
      const state = store.getState()
      this.listeners.forEach(listener => {
        listener(action, state)
      })
    }

    return actionToDispatch
  }

  getListeners = () => this.listeners

  subscribe = (listener: Listener<TStoreState>) => {
    this.listeners = this.listeners.concat(listener)
  }

  unsubscribe = () => {
    this.listeners = []
  }
}

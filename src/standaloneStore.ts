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
  private listener: Listener<TStoreState> | null = null
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

    if (this.listener) {
      const state = store.getState()
      this.listener(action, state)
    }

    return actionToDispatch
  }

  getListener = () => this.listener

  subscribe = (listener: Listener<TStoreState>) => {
    this.listener = listener
  }
}

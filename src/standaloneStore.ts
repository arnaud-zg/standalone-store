import { AnyAction, StoreCreator } from 'redux'

type Listener<TStoreState> = (
  action: AnyAction | null,
  state: TStoreState
) => void

export class StandaloneStore<TStoreState> {
  private listeners: Array<Listener<TStoreState>>
  private store: ReturnType<StoreCreator>
  private lastAction: AnyAction | null

  constructor({ store }: { store: ReturnType<StoreCreator> }) {
    this.lastAction = null
    this.listeners = []
    this.store = store

    this.store.subscribe(this.storeUpdate)
  }

  dispatchAction = (action: AnyAction) => {
    this.lastAction = action
    this.store.dispatch(action)
  }

  storeUpdate = () => {
    const state = this.store.getState() as TStoreState

    if (this.listeners.length) {
      this.listeners.forEach(listener => {
        listener(this.lastAction, state)
      })
    }
  }

  subscribe(listener: Listener<TStoreState>) {
    this.listeners.push(listener)
  }
}

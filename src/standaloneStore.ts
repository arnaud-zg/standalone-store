import { AnyAction, StoreCreator } from 'redux'

type Listener<TStoreState> = (action: AnyAction, state: TStoreState) => void

export class StandaloneStore<TStoreState> {
  private listeners: Array<Listener<TStoreState>>
  private store: ReturnType<StoreCreator>
  private lastActions: AnyAction[]

  constructor({ store }: { store: ReturnType<StoreCreator> }) {
    this.lastActions = []
    this.listeners = []
    this.store = store

    this.store.subscribe(this.storeUpdate)
  }

  dispatchAction = (action: AnyAction) => {
    this.lastActions = [action]
    this.store.dispatch(action)
  }

  storeUpdate = () => {
    const state = this.store.getState() as TStoreState

    if (this.listeners.length) {
      this.listeners.forEach(listener => {
        listener(this.lastActions[0], state)
      })
    }
  }

  getListeners = () => this.listeners

  listenersPop = () => {
    if (this.listeners.length) {
      this.listeners.pop()
    }
  }

  listenersClear = () => {
    if (this.listeners.length) {
      this.listeners = []
    }
  }

  subscribe = (listener: Listener<TStoreState>) => {
    this.listeners.push(listener)
  }
}

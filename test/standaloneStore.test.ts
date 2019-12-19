import { configureStore, putCredentials, TState } from 'ts-foursquare'
import { getType } from 'typesafe-actions'
import { StandaloneStore } from '../src'

describe('StandaloneStore', () => {
  const store = configureStore({ middlewares: [] })
  it(`should work without any listener`, () => {
    const standaloneStore = new StandaloneStore<TState>({ store })

    standaloneStore.dispatchAction(
      putCredentials({
        clientId: '123',
        clientSecret: '456',
      })
    )
  })

  it(`should make a snapshot of 0 listeners`, () => {
    const standaloneStore = new StandaloneStore<TState>({ store })

    standaloneStore.listenersClear()
    expect(standaloneStore.getListeners().length === 0).toBeTruthy()

    standaloneStore.subscribe(() => {})
    standaloneStore.subscribe(() => {})
    standaloneStore.listenersClear()
    expect(standaloneStore.getListeners().length === 0).toBeTruthy()
  })

  it(`should make a snapshot of registered listeners`, () => {
    const standaloneStore = new StandaloneStore<TState>({ store })
    standaloneStore.subscribe(() => {})

    const listeners = standaloneStore.getListeners()
    expect(listeners).toMatchSnapshot()

    standaloneStore.listenersPop()
    standaloneStore.listenersPop()
  })

  it(`should make a snapshot of store after of action: putCredentials`, done => {
    const standaloneStore = new StandaloneStore<TState>({ store })

    standaloneStore.subscribe((action, state) => {
      expect(state).toMatchSnapshot()

      if (action && action.type === getType(putCredentials)) {
        standaloneStore.listenersPop()
        done()
      }
    })

    standaloneStore.dispatchAction(
      putCredentials({
        clientId: '123',
        clientSecret: '456',
      })
    )
  })
})

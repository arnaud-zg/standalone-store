import { configureStore, putCredentials, TState } from 'ts-foursquare'
import { getType } from 'typesafe-actions'
import { StandaloneStore } from '../src/standaloneStore'

describe('StandaloneStore', () => {
  const store = configureStore()
  it(`should work without any listener`, () => {
    const standaloneStore = new StandaloneStore<TState>({ store })

    standaloneStore.dispatchAction(
      putCredentials({
        clientId: '123',
        clientSecret: '456',
      })
    )
  })

  it(`should make a snapshot of store after of action: putCredentials`, done => {
    const standaloneStore = new StandaloneStore<TState>({ store })

    standaloneStore.subscribe((action, state) => {
      expect(state).toMatchSnapshot()

      if (action && action.type === getType(putCredentials)) {
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

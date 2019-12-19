import { configureStore, putCredentials, TState } from 'ts-foursquare'
import { isActionOf } from 'typesafe-actions'
import { StandaloneStore } from '../src'

describe('StandaloneStore', () => {
  it(`should work without any listener`, () => {
    const standaloneStore = new StandaloneStore<TState>({ configureStore })

    standaloneStore.dispatchAction(
      putCredentials({
        clientId: '123',
        clientSecret: '456',
      })
    )
  })

  it(`should test listener`, () => {
    const standaloneStore = new StandaloneStore<TState>({ configureStore })

    expect(standaloneStore.getListeners().length).toEqual(0)
    standaloneStore.subscribe(() => {})
    expect(standaloneStore.getListeners().length).toEqual(1)
    standaloneStore.unsubscribe()
    expect(standaloneStore.getListeners().length).toEqual(0)
  })

  it(`should make a snapshot of store after of action: putCredentials`, done => {
    const standaloneStore = new StandaloneStore<TState>({ configureStore })

    standaloneStore.subscribe((action, state) => {
      if (isActionOf(putCredentials, action)) {
        expect({ action, state }).toMatchSnapshot()
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

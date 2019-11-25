import {
  configureStore,
  lifeCredentialsSelector,
  putCredentials,
} from 'ts-foursquare'
import { dispatchActionsAndWaitResponse } from '../src'

describe('asyncAction', () => {
  it(`should wait end of putCredentials with promise and make a snapshot of store`, done => {
    dispatchActionsAndWaitResponse({
      actions: [],
      store: configureStore(),
      selector: () => {},
    }).catch(error => {
      expect(error).toMatchSnapshot()
      done()
    })
  })

  it(`should wait end of putCredentials with promise and make a snapshot of store`, done => {
    dispatchActionsAndWaitResponse({
      actions: [
        putCredentials({
          clientId: '123',
          clientSecret: '456',
        }),
      ],
      store: configureStore(),
      selector: lifeCredentialsSelector,
    }).then(data => {
      expect(data).toMatchSnapshot()
      done()
    })
  })
})

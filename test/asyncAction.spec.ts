import {
  configureStore,
  lifeCredentialsSelector,
  putCredentials,
  setOAuth2,
} from 'ts-foursquare'
import { dispatchActionsAndWaitResponse } from '../src'

describe('asyncAction', () => {
  it(`should wait end of putCredentials with promise and make a snapshot of store`, done => {
    dispatchActionsAndWaitResponse({
      actionsDispatch: [
        putCredentials({
          clientId: '123',
          clientSecret: '456',
        }),
        setOAuth2({
          clientId: '123',
          clientSecret: '456',
          redirectUri: 'https://www.google.com',
        }),
      ],
      actionCreatorsResolve: [setOAuth2],
      configureStore,
      selector: lifeCredentialsSelector,
    }).then(data => {
      expect(data).toMatchSnapshot()
      done()
    })
  })
})

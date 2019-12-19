import {
  configureStore,
  getVenuesSearchAsync,
  putCredentials,
} from 'ts-foursquare'
import { NStore } from 'ts-foursquare/types'
import { dispatchActionsAndWaitResponse } from '../src'

describe('asyncAction', () => {
  it(`should wait end of all actions with promise and make a snapshot of store`, done => {
    dispatchActionsAndWaitResponse<NStore.IState, NStore.IState>({
      actionsDispatch: [
        putCredentials({
          clientId: '123',
          clientSecret: '456',
        }),
        getVenuesSearchAsync.request({ ll: '40.7099,-73.9622' }),
      ],
      actionCreatorsResolve: [
        getVenuesSearchAsync.cancel,
        getVenuesSearchAsync.failure,
        getVenuesSearchAsync.success,
      ],
      configureStore,
      selector: state => state,
    }).then(data => {
      expect(data).toMatchSnapshot()
      done()
    })
  })
})

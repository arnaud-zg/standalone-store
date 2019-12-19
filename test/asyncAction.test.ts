import { configureStore } from 'ts-foursquare'
import { dispatchActionsAndWaitResponse } from '../src'

describe('asyncAction', () => {
  it(`should throw an error`, done => {
    dispatchActionsAndWaitResponse({
      actionsDispatch: [],
      actionCreatorsResolve: [],
      configureStore,
      selector: () => {},
    }).catch(error => {
      expect(error).toMatchSnapshot()
      done()
    })
  })
})

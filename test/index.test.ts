import * as projectPackage from '../src'

describe('projectPackage', () => {
  it('should have a list of method', () => {
    expect(projectPackage).toMatchSnapshot()
  })
})

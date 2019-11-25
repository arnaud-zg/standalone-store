# Standalone Store

Middleware for redux store in standalone mode

[![Build Status](https://travis-ci.org/arnaud-zg/standalone-store.svg?branch=develop)](https://travis-ci.org/arnaud-zg/standalone-store)
[![codecov](https://codecov.io/gh/arnaud-zg/standalone-store/branch/develop/graph/badge.svg)](https://codecov.io/gh/arnaud-zg/standalone-store)

## Getting Started

These instructions will let you know how to use the library.

### Prerequisites

Things you need to install before using this library.

```
node: 10.15.0
nvm: 0.33.6
```

### Installing

Using npm:

```shell
npm i --save standalone-store
```

Using yarn:

```shell
yarn add --dev standalone-store
```

## Usage

Once you have instanciated your store, you can use `standalone-store` as a middleware.

If you don't know what is `configureStore` take a look at redux documentation (https://redux.js.org/recipes/configuring-your-store#the-solution-configurestore).

## Simple

### Callback

```js
const getUser = () => {
  return dispatchActionsAndWaitResponse({
    actions: [
      getUser(payload),
    ],
    store: configureStore(),
    selector: userSelector,
  })
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  })
  .finally(() => {
    // Do something ...
  })
}
```

### Async / Await

```js
async getUser = () => {
  try {
    const data = await dispatchActionsAndWaitResponse({
      actions: [
        getUser(payload),
      ],
      store: configureStore(),
      selector: userSelector,
    })
    console.log(data)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    // Do something
  }
}
```

### Advanced

```js
  const store = configureStore()
  const standaloneStore = new StandaloneStore<TState>({ store })
```

#### Dispatch an redux action

For example we have an action `getUser`, we want to display this action with a payload.

```js
  const payload = { userId: '1234' }
  standaloneStore.dispatchAction(
    getUser(payload)
  )
```

#### Subscribe to an event

```js
  standaloneStore.subscribe((action, state) => {
    console.log({ action, state })
    // Don't forget to remove listener once you don't need it anymore
    standaloneStore.listenersPop()
  })
```

## Running the tests

Tests are written with jest

### Unit tests

Using jest:

```shell
yarn run test
```

## Deployment

Deployment is done with Travis.

## Built With

* [TSDX](https://github.com/palmerhq/tsdx) - TSDX

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/arnaud-zg/standalone-store/tags).

## Authors

* **Arnaud Zheng** - *Initial work* - [arnaud-zg](https://github.com/arnaud-zg)

See also the list of [contributors](https://github.com/arnaud-zg/standalone-store/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

# Standalone Store

Middleware for redux store in standalone mode for nodejs environment

[![Build Status](https://travis-ci.org/arnaud-zg/standalone-store.svg?branch=develop)](https://travis-ci.org/arnaud-zg/standalone-store)
[![codecov](https://codecov.io/gh/arnaud-zg/standalone-store/branch/develop/graph/badge.svg)](https://codecov.io/gh/arnaud-zg/standalone-store)

## Getting Started

### Motivation

Nowadays many websites use SPA architecture:

More and more JavaScript is being used.
A lot of code on the client side.
Some code can be shared with back-end.

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

In addition to redux documentation, `configureStore` need a parameter.

```ts
type ConfigureStore = ({ middlewares }: { middlewares: Middleware[] }) => ReturnType<StoreCreator>
```

## Simple

### Callback

```js
const getUser = () => {
  return dispatchActionsAndWaitResponse({
    actionsDispatch: [getUser(payload)],
    actionCreatorsResolve: [getUser]
    configureStore,
    selector: userSelector,
  })
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  })
  .finally(() => {
    console.log('done')
  })
}
```

### Async / Await

```js
const getUser = async () => {
  try {
    const data = await dispatchActionsAndWaitResponse({
      actionsDispatch: [getUser(payload)],
      actionCreatorsResolve: [getUser],
      configureStore,
      selector: userSelector,
    })
    console.log(data)
  }
  catch (error) {
    console.log(error)
  }
  finally {
    console.log('done')
  }
}
```

### Advanced

```js
const standaloneStore = new StandaloneStore<TState>({ configureStore })
```

#### Dispatch an redux action

For example we have an action `getUser`, we want to display this action with a payload.

```js
const payload = { userId: '1234' }
standaloneStore.dispatchAction(getUser(payload))
```

#### Get all listeners

```js
standaloneStore.getListeners()
```

#### Subscribe to an event

```js
import { isActionOf } from 'typesafe-actions'

standaloneStore.subscribe((action, state) => {
  if (isActionOf(getUser, action)) {
    console.log({ action, state })
  }
})
```

#### Unsubscribe to all event

```js
standaloneStore.unsubscribe()
```

## Migration Guides

### v0.1.x to v1.x.x

`ConfigureStore` has been added with specific parameter, normally it should be a function which encapsulates store creation logic, in addition of that, it can accept a list of middleware to be applied.

1. If you don't need to add any extra middleware, just pass an empty array (`configureStore({ middlewares: []})`).
2. Make sure your `configureStore` match with given type.

```ts
type ConfigureStore = ({ middlewares }: { middlewares: Middleware[] }) => ReturnType<StoreCreator>
```

**Breaking changes:**

#### `dispatchActionsAndWaitResponse`

1. In `v1.x.x`, parameter`store` was replace by `configureStore`;

```ts
// before
dispatchActionsAndWaitResponse({
  actionsDispatch: [getUser(payload)],
  actionCreatorsResolve: [getUser]
  store: configureStore(),
  selector: userSelector,
})

// after
dispatchActionsAndWaitResponse({
  actionsDispatch: [getUser(payload)],
  actionCreatorsResolve: [getUser]
  configureStore,
  selector: userSelector,
})
```

#### Standalone Store

1. In `v1.x.x` functions below are deprecated;
  - `standaloneStore.listenersPop`
  - `standaloneStore.listenersClear` has been replaced by `unsubscribe`

2. `StandaloneStore` take a method `configureStore` as parameter, store was removed. Pay attention about the type of `configureStore`.

```ts
// before
const store = configureStore()
const standaloneStore = new StandaloneStore<TState>({ store })

// after
const standaloneStore = new StandaloneStore()<TState>({ configureStore })
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

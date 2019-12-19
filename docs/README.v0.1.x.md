## Usage

Once you have instanciated your store, you can use `standalone-store` as a middleware.

If you don't know what is `configureStore` take a look at redux documentation (https://redux.js.org/recipes/configuring-your-store#the-solution-configurestore).

## Simple

### Callback

```ts
const getUser = () => {
  return dispatchActionsAndWaitResponse({
    actionsDispatch: [getUser(payload)],
    actionCreatorsResolve: [getUser]
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
    console.log('done')
  })
}
```

### Async / Await

```ts
const getUser = async () => {
  try {
    const data = await dispatchActionsAndWaitResponse({
      actionsDispatch: [getUser(payload)],
      actionCreatorsResolve: [getUser],
      store: configureStore(),
      selector: userSelector,
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  } finally {
    console.log('done')
  }
}
```

### Advanced

```ts
const store = configureStore()
const standaloneStore = new StandaloneStore<TState>({ store })
```

#### Dispatch an redux action

For example we have an action `getUser`, we want to display this action with a payload.

```ts
const payload = { userId: '1234' }
standaloneStore.dispatchAction(getUser(payload))
```

#### Subscribe to an event

/!\ Don't forget to remove listener once you don't need it anymore

```ts
standaloneStore.subscribe((action, state) => {
  console.log({ action, state })
})
```

#### Unsubscribe to an event

```ts
standaloneStore.listenersPop()
```

##### Unsubscribe to all events

```ts
standaloneStore.listenersClear()
```

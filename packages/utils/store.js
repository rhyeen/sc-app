import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://pwa-starter-kit.polymer-project.org/redux-and-state-management/
export const store = createStore(
  state => state,
  devCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(sagaMiddleware)),
);

// Call to run a saga: `store.runSage(mySaga)`
store.runSaga = sagaMiddleware.run;

// See the [Redux-Saga API docs](https://github.com/redux-saga/redux-saga/blob/master/docs/api/README.md)
// for more info on `END`.
store.close = () => store.dispatch(END);

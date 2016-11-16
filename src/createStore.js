import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
};

const createReduxStore = (rootReducer) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware),
    )
  );

  return {
    ...store,
    runSaga: sagaMiddleware.run,
  };
};

export default createReduxStore;

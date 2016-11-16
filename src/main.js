import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import createStore from './createStore';
import rootReducer from './ducks';
import rootSaga from './sagas';

require('babel-polyfill');

const store = createStore(rootReducer);
store.runSaga(rootSaga);

render(
  (
    <Provider store={store}>
      <App/>
    </Provider>
  ),
  document.getElementById('root')
);

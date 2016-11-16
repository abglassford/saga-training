import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import api, { BASE_URL } from '../api';

import { storeUsers } from '../ducks/users';

function* getUsers() {
  const result = yield api.get(`${BASE_URL}/users`);
  console.log(result.data);

  yield put(storeUsers(result.data));
}

function* rootSaga() {
  yield [
    takeEvery('GET_USERS', getUsers),
  ];
}

export default rootSaga;

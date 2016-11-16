import { takeEvery, takeLatest, delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import api, { BASE_URL } from '../api';

import { storeUsers } from '../ducks/users';

function* getTodos() {
  const result = yield call(api.get, `${BASE_URL}/todos`);
  return result.data;
}

function* getUsers() {
  const result = yield call(api.get, `${BASE_URL}/users`);

  yield delay(1000)

  yield put(storeUsers(result.data));

  return result.data;
}

function* getAllTheThings() {
  const [
    users,
    todos,
  ] = yield [
    call(getTodos),
    call(getUsers),
  ];

  console.log(users, todos);
}

function* rootSaga() {
  yield [
    takeEvery('GET_ALL_THE_THINGS', getAllTheThings),
    takeLatest('GET_USERS', getUsers),
  ];
}

export default rootSaga;

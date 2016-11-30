import { takeEvery, takeLatest, delay } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import uuid from 'uuid/v1';

import api, { BASE_URL } from '../api';
import { storeUsers } from '../ducks/users';

function* getTodos() {
  const result = yield call(api.get, `${BASE_URL}/todos`);
  return result.data;
}

function* getUsers() {
  try {
    const result = yield call(api.get, `${BASE_URL}/users`);
    yield put(storeUsers(result.data));
    return result.data;
  } catch(e) {
    return [];
  }
}

function* addUser({ payload }) {
  const users = yield select(state => state.users);

  const dopeUsers = users.filter(user => user.name === payload.username);

  if (dopeUsers.length === 0) {
    const user = {
      id: uuid(),
      name: payload.username,
    };

    yield call(api.post, `${BASE_URL}/users`, user);
    yield call(getUsers);
  }
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
    takeEvery('ADD_USER', addUser),
  ];
}

export default rootSaga;

const STORE_USERS = 'STORE_USERS';

export const storeUsers = users => ({
  type: STORE_USERS,
  payload: users,
});

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;

import rxPartial from '../rxPartial';

const REGISTER = 'auth/REGISTER';
const REGISTER_FULFILLED = 'auth/REGISTER_FULFILLED';

export const register = ({ email, password }) => ({ type: REGISTER, email, password });

const registerFulfilled = payload => ({ type: REGISTER_FULFILLED, payload });

const registerEpic = action$ =>
  action$.ofType(REGISTER).mergeMap(action => {
    const body = { emai, password };
    return ajax({
      method: 'POST',
      url: '/api/auth',
      body: { email, password },
    })
      .map(response => registerFulfilled(response));
  });

export const authEpic = action$ => action$.filter(action => action.type === 'FOO').mapTo({ type: null });

export const reducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

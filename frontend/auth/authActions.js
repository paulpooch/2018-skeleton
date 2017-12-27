import { Observable } from '../rxPartial';
import { combineEpics } from 'redux-observable';

const REGISTER = 'auth/REGISTER';
const REGISTER_FULFILLED = 'auth/REGISTER_FULFILLED';

export const register = ({ email, password }) => ({ type: REGISTER, payload: { email, password } });

const registerFulfilled = payload => ({ type: REGISTER_FULFILLED, payload });

const registerEpic = action$ =>
  action$.ofType(REGISTER).mergeMap(action => {
    const { email, password } = action.payload;
    const body = { email, password };
    return Observable.ajax({
      method: 'POST',
      url: '/auth',
      body: { email, password },
    }).map(response => registerFulfilled(response));
  });

export const reducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const epic = combineEpics(registerEpic);

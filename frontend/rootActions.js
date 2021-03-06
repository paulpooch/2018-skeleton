import { combineEpics } from 'redux-observable';
import { epic as authEpic, reducer as authReducer } from './auth/authActions';
import { combineReducers } from 'redux';

export const rootEpic = combineEpics(
  authEpic,
);

export const rootReducer = combineReducers({
  auth: authReducer,
});

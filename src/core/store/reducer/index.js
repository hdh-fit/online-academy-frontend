import { userReducer } from './user';
import { combineReducers } from 'redux';
import { appReducer } from './app';

export const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
});

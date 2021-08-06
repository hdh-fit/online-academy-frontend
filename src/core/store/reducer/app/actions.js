import {
  LOGIN_SUCCESS,
  LOG_OUT_SUCCESS,
} from './types';

export const onLoginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const onLogOutSuccess = () => ({
  type: LOG_OUT_SUCCESS,
});

import {
  LOGIN_SUCCESS,
  LOG_OUT_SUCCESS,
  SAVE_CATEGORIES,
} from './types';

export const onLoginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const onLogOutSuccess = () => ({
  type: LOG_OUT_SUCCESS,
});
export const onSaveCategories = (payload) => ({
  type: SAVE_CATEGORIES,
  payload
});

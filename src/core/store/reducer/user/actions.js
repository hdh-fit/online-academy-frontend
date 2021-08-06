import {
  SET_TOKEN,
  SET_USER,
} from './types';

export const onSetUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const onSetToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

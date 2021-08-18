import {
  LOGIN_SUCCESS,
  LOG_OUT_SUCCESS,
  SAVE_CATEGORIES
} from './types';

const initialState = {
  accessToken: undefined,
  isLogin: false,
  categories: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        accessToken: action.payload,
        isLogin: true
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        accessToken: undefined,
        isLogin: false
      };
    }
    case SAVE_CATEGORIES: {
      return {
        ...state,
        categories: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

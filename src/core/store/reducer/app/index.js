import {
  LOGIN_SUCCESS,
  LOG_OUT_SUCCESS
} from './types';

const initialState = {
  accessToken: undefined,
  isLogin: false,
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

    default: {
      return state;
    }
  }
};

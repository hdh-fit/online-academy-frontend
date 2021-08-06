import {
  SET_TOKEN,
  SET_USER,
} from './types';

const initialState = {
  "_id": "",
  "fullname": "",
  "username": "",
  "password": "",
  "phone": "",
  "type": undefined,
  "gender": "",
  "dob": "",
  "email": "",
  "accessToken": "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_TOKEN: {
      return {
        ...state,
        accessToken: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

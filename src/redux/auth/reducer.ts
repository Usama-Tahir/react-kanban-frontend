import { Reducer } from 'redux';
import {
  AuthLoginActionTypes,
  AuthRegisterActionTypes,
  AuthState,
} from './types';
export const initialState: AuthState = {
  authenticated: false,
  loading: false,
  user: {},
  errors: '',
};
const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthLoginActionTypes.LOGIN_REQUEST: {
      return { ...state, loading: action.payload };
    }
    case AuthLoginActionTypes.LOGIN_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case AuthLoginActionTypes.LOGIN_ERROR: {
      return { ...state, ...action.payload };
    }
    case AuthRegisterActionTypes.REGISTER_REQUEST: {
      return { ...state, loading: action.payload };
    }
    case AuthRegisterActionTypes.REGISTER_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case AuthRegisterActionTypes.REGISTER_ERROR: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
export { reducer as AuthReducer };

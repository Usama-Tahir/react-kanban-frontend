import {
  AuthLoginActionTypes,
  AuthState,
  Login,
  RequestLoading,
  AuthRegisterActionTypes,
  Register,
} from './types';
import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../index';
import { login, register } from '../../services/auth';

// for login.
function loginRequestInit(payload: RequestLoading) {
  return { type: AuthLoginActionTypes.LOGIN_REQUEST, payload };
}
function loginSuccess(payload: AuthState) {
  return { type: AuthLoginActionTypes.LOGIN_SUCCESS, payload };
}
function loginFailure(payload: AuthState) {
  return { type: AuthLoginActionTypes.LOGIN_ERROR, payload };
}

// for register.
function registerRequestInit(payload: RequestLoading) {
  return { type: AuthRegisterActionTypes.REGISTER_REQUEST, payload };
}
function registerSuccess(payload: RequestLoading) {
  return { type: AuthRegisterActionTypes.REGISTER_SUCCESS, payload };
}
function registerFailure(payload: AuthState) {
  return { type: AuthRegisterActionTypes.REGISTER_ERROR, payload };
}

export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const registerRequest: AppThunk = (registerPayload: Register) => {
  return (dispatch: Dispatch): Action => {
    dispatch(registerRequestInit({ loading: true }));
    try {
      const registerApiResponse = register(registerPayload);
      console.log({ registerApiResponse });
      return dispatch(
        registerSuccess({
          loading: false,
        }),
      );
      // redirect to login page.
    } catch (error) {
      return dispatch(
        registerFailure({
          loading: false,
          authenticated: false,
          user: {},
          errors: 'Registeration Failed',
        }),
      );
    }
  };
};

export const loginRequest: AppThunk = (loginPayload: Login) => {
  return (dispatch: Dispatch): Action => {
    dispatch(loginRequestInit({ loading: true }));
    try {
      const loginApiResponse = login(loginPayload);
      console.log(loginApiResponse);
      return dispatch(
        loginSuccess({
          loading: false,
          authenticated: true,
          user: {},
        }),
      );
    } catch (error) {
      return dispatch(
        loginFailure({
          loading: false,
          authenticated: false,
          user: {},
          errors: 'Auth Failed',
        }),
      );
    }
  };
};

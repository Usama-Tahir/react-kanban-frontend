import {
  AuthLoginActionTypes,
  AuthState,
  Login,
  RequestLoading,
  AuthRegisterActionTypes,
  Register,
  User,
} from './types';
import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../index';
import { login, register } from '../../services/auth';
import { decodeJwt } from '../../lib/validateUser';

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
  return async (dispatch: Dispatch) => {
    dispatch(registerRequestInit({ loading: true }));
    try {
      await register(registerPayload);
      dispatch(
        registerSuccess({
          loading: false,
        }),
      );
      // I am sorry :(
      window.location.href = '/login';
    } catch (error) {
      dispatch(
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
  return async (dispatch: Dispatch) => {
    dispatch(loginRequestInit({ loading: true }));
    try {
      const { data } = await login(loginPayload);
      const { accessToken } = data;
      localStorage.setItem('token', accessToken);
      const decodedJwt: any = decodeJwt(accessToken);
      const user: User = {
        firstName: decodedJwt.firstName,
        lastName: decodedJwt.lastName,
        email: decodedJwt.email,
      };
      dispatch(
        loginSuccess({
          loading: false,
          authenticated: true,
          user: user,
        }),
      );
      // sorry again :(
      // due to this redux state won't be persisted.
      // we are relying on local storage token for authentication
      window.location.href = '/';
    } catch (error) {
      dispatch(
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

export interface Login {
  email: string;
  password: string;
}
export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export enum AuthLoginActionTypes {
  LOGIN_REQUEST = '@@Auth/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@@Auth/LOGIN_SUCCESS',
  LOGIN_ERROR = '@@Auth/LOGIN_ERROR',
}

export enum AuthRegisterActionTypes {
  REGISTER_REQUEST = '@@Auth/REGISTER_REQUEST',
  REGISTER_SUCCESS = '@@Auth/REGISTER_SUCCESS',
  REGISTER_ERROR = '@@Auth/REGISTER_ERROR',
}
export interface User {
  firstName: string;
  lastName: string;
  email: string;
}
export interface AuthState {
  readonly loading: boolean;
  readonly authenticated: boolean;
  readonly user: User | {};
  readonly errors?: string;
}

export interface RequestLoading {
  loading: boolean;
}

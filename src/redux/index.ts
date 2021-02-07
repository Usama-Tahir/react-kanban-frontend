import { combineReducers } from 'redux';
import { AuthState } from './auth/types';
import { AuthReducer } from './auth/reducer';
export interface ApplicationState {
  auth: AuthState;
}
const rootReducer = combineReducers<ApplicationState>({
  auth: AuthReducer,
});
export default rootReducer;

import { combineReducers } from 'redux';
import { AuthState } from './auth/types';
import { AuthReducer } from './auth/reducer';
import { CardsState } from './cards/types';
import { CardsReducer } from './cards/reducer';
export interface ApplicationState {
  auth: AuthState;
  cards: CardsState;
}
const rootReducer = combineReducers<ApplicationState>({
  auth: AuthReducer,
  cards: CardsReducer,
});
export default rootReducer;

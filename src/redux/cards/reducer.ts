import { Reducer } from 'redux';
import { CardsState, AddCardActionTypes, GetCardsActionTypes } from './types';
export const initialState: CardsState = {
  loading: false,
  cards: [],
  errors: '',
};
const reducer: Reducer<CardsState> = (state = initialState, action) => {
  switch (action.type) {
    case AddCardActionTypes.ADD_CARD_REQUEST: {
      return { ...state, loading: action.payload };
    }
    case AddCardActionTypes.ADD_CARD_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case AddCardActionTypes.ADD_CARD_ERROR: {
      return { ...state, ...action.payload };
    }
    case GetCardsActionTypes.GET_CARDS_REQUEST: {
      return { ...state, loading: action.payload };
    }
    case GetCardsActionTypes.GET_CARDS_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case GetCardsActionTypes.GET_CARDS_ERROR: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
export { reducer as CardsReducer };

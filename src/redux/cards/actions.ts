import {
  AddCardActionTypes,
  Card,
  CardsState,
  RequestLoading,
  GetCardsActionTypes,
  UpdateCardActionTypes,
  IPartialCard,
} from './types';
import { ActionCreator, Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../index';
import { addCardApi, getCardsApi, updateCardApi } from '../../services/cards';

function updateCardRequestInit(payload: RequestLoading) {
  return { type: UpdateCardActionTypes.UPDATE_CARD_REQUEST, payload };
}

function updateCardFailure(payload: CardsState) {
  return { type: UpdateCardActionTypes.UPDATE_CARD_ERROR, payload };
}

function addCardRequestInit(payload: RequestLoading) {
  return { type: AddCardActionTypes.ADD_CARD_REQUEST, payload };
}
function addCardSuccess(payload: CardsState) {
  return { type: AddCardActionTypes.ADD_CARD_SUCCESS, payload };
}
function addCardFailure(payload: CardsState) {
  return { type: AddCardActionTypes.ADD_CARD_ERROR, payload };
}

function getCardsRequestInit(payload: RequestLoading) {
  return { type: GetCardsActionTypes.GET_CARDS_REQUEST, payload };
}
function getCardsSuccess(payload: CardsState) {
  return { type: GetCardsActionTypes.GET_CARDS_SUCCESS, payload };
}
function getCardsFailure(payload: CardsState) {
  return { type: GetCardsActionTypes.GET_CARDS_ERROR, payload };
}

export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const updateCardRequest: AppThunk = (
  id: string,
  payload: IPartialCard,
) => {
  return async (dispatch: Dispatch, getState) => {
    const state: ApplicationState = getState();
    let oldCards: Card[] = [...state.cards.cards];
    oldCards = oldCards.map(card => {
      if (card._id === id) {
        const newCard = {
          ...card,
          ...payload,
        };
        return newCard;
      }
      return card;
    });
    dispatch(
      getCardsSuccess({
        loading: false,
        cards: oldCards,
        errors: '',
      }),
    );
    dispatch(updateCardRequestInit({ loading: true }));
    try {
      await updateCardApi(id, payload);
    } catch (error) {
      dispatch(
        updateCardFailure({
          loading: false,
          cards: [],
          errors: 'Failed to fetch Cards Data!',
        }),
      );
    }
  };
};

export const addCardRequest: AppThunk = (title: string) => {
  return async (dispatch: Dispatch, getState) => {
    const state: ApplicationState = getState();
    const oldCards: Card[] = state.cards.cards;
    dispatch(addCardRequestInit({ loading: true }));
    try {
      const { data } = await addCardApi(title);
      const cards: Card[] = [...oldCards, { ...data }];
      dispatch(
        addCardSuccess({
          loading: false,
          cards,
          errors: '',
        }),
      );
    } catch (error) {
      dispatch(
        addCardFailure({
          loading: false,
          cards: [],
          errors: 'Failed to fetch Cards Data!',
        }),
      );
    }
  };
};

export const getCardsRequest: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getCardsRequestInit({ loading: true }));
    try {
      const { data } = await getCardsApi();
      const cards: Card[] = data;
      dispatch(
        getCardsSuccess({
          loading: false,
          cards,
          errors: '',
        }),
      );
    } catch (error) {
      dispatch(
        getCardsFailure({
          loading: false,
          cards: [],
          errors: 'Failed to fetch Cards Data!',
        }),
      );
    }
  };
};

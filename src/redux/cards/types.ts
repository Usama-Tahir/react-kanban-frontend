export enum UpdateCardActionTypes {
  UPDATE_CARD_REQUEST = '@@Auth/UPDATE_CARD_REQUEST',
  UPDATE_CARD_SUCCESS = '@@Auth/UPDATE_CARD_SUCCESS',
  UPDATE_CARD_ERROR = '@@Auth/UPDATE_CARD_ERROR',
}

export enum AddCardActionTypes {
  ADD_CARD_REQUEST = '@@Auth/ADD_CARD_REQUEST',
  ADD_CARD_SUCCESS = '@@Auth/ADD_CARD_SUCCESS',
  ADD_CARD_ERROR = '@@Auth/ADD_CARD_ERROR',
}

export enum GetCardsActionTypes {
  GET_CARDS_REQUEST = '@@Auth/GET_CARDS_REQUEST',
  GET_CARDS_SUCCESS = '@@Auth/GET_CARDS_SUCCESS',
  GET_CARDS_ERROR = '@@Auth/GET_CARDS_ERROR',
}

export interface Card {
  currency: string;
  hourlyRate: number;
  timeSpent: string;
  calculatedCost: string;
  state: string;
  _id: string;
  title: string;
  userId: string;
  startTime?: number;
  endTime?: number;
  createdAt: string;
  updatedAt: string;
}
export interface IPartialCard {
  _id: string;
  calculatedCost?: string;
  timeSpent?: string;
  state: string;
  startTime?: number;
  endTime?: number;
}
export interface CardsState {
  readonly loading: boolean;
  readonly cards: Card[] | [];
  readonly errors?: string;
}

export interface RequestLoading {
  loading: boolean;
}

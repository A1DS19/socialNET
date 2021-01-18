import { types } from './types';

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface AsyncActionStart {
  type: types.ASYNC_ACTION_START;
}

export interface AsyncActionFinish {
  type: types.ASYNC_ACTION_FINISH;
}

export interface AsyncActionError {
  type: types.ASYNC_ACTION_ERROR;
  payload: string;
}

export const asyncActionStart = (): AsyncActionStart => {
  return {
    type: types.ASYNC_ACTION_START,
  };
};

export const asyncActionFinish = (): AsyncActionFinish => {
  return {
    type: types.ASYNC_ACTION_FINISH,
  };
};
export const asyncActionError = (error: string): AsyncActionError => {
  return {
    type: types.ASYNC_ACTION_ERROR,
    payload: error,
  };
};

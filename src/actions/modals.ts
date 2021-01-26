import { types } from './types';

export interface ModalPayload {
  type: 'LoginForm' | 'RegisterForm';
  props?: JSX.Element;
}

export interface OpenModalAction {
  type: types.OPEN_MODAL;
  payload: ModalPayload;
}

export interface CloseModalAction {
  type: types.CLOSE_MODAL;
}

export const openModal = (payload: ModalPayload): OpenModalAction => {
  return {
    type: types.OPEN_MODAL,
    payload,
  };
};

export const closeModal = (): CloseModalAction => {
  return {
    type: types.CLOSE_MODAL,
  };
};

import { ModalPayload } from './../actions/modals';
import { types, ModalAction } from '../actions/types';

export const modalsReducer = (state: ModalPayload | null = null, action: ModalAction) => {
  switch (action.type) {
    case types.OPEN_MODAL:
      return action.payload;

    case types.CLOSE_MODAL:
      return null;

    default:
      return state;
  }
};

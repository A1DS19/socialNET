import { AuthAction } from './../actions/types';
import { types } from '../actions/types';
import { AuthPayload } from '../actions/auth';

export interface InitialStateProps {
  authenticated: boolean;
  currentUser: AuthPayload | null;
}

const initialState: InitialStateProps = {
  authenticated: false,
  currentUser: null,
};

export const authReducer = (
  state: InitialStateProps = initialState,
  action: AuthAction
) => {
  switch (action.type) {
    case types.SIGNED_IN:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: action.payload.email,
          password: action.payload.password,
          photoURL: '/assets/user.png',
        },
      };

    case types.SIGNED_OUT:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };

    default:
      return state;
  }
};

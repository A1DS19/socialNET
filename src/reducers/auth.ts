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

export const authReducer = (state: any = initialState, action: AuthAction) => {
  switch (action.type) {
    case types.SIGNED_IN:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: action.payload!.email,
          displayName: action.payload?.displayName,
          photoURL: action.payload?.photoURL,
          uid: action.payload?.uid,
          createdAt: action.payload?.metadata.creationTime,
          providerId: action.payload?.providerData[0]?.providerId,
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

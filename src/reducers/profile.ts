import { types, ProfileAction } from '../actions/types';

export interface ProfileStateProps {
  currentUserProfile: null | any;
  selectedUserProfile: null | any;
}

const initialState: ProfileStateProps = {
  currentUserProfile: null,
  selectedUserProfile: null,
};

export const profileReducer = (
  state: ProfileStateProps = initialState,
  action: ProfileAction
) => {
  switch (action.type) {
    case types.LISTEN_CURRENT_PROFILE_DATA:
      return { ...state, currentUserProfile: action.payload };
    case types.LISTEN_SELECTED_PROFILE_DATA:
      return { ...state, selectedUserProfile: action.payload };

    default:
      return state;
  }
};

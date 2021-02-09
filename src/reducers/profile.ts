import { types, ProfileAction } from '../actions/types';

export interface ProfileStateProps {
  currentUserProfile: null | any;
  selectedUserProfile: null | any;
  profileEvents: [] | any;
  followers: [] | any;
  followings: [] | any;
  followingUser: boolean;
  feed: [] | any;
  photos: [];
}

const initialState: ProfileStateProps = {
  currentUserProfile: null,
  selectedUserProfile: null,
  profileEvents: [],
  followers: [],
  followings: [],
  feed: [],
  followingUser: false,
  photos: [],
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
    case types.LISTEN_USER_PHOTOS:
      return { ...state, photos: action.payload };
    case types.LISTEN_USER_EVENTS:
      return { ...state, profileEvents: action.payload };
    case types.LISTEN_USER_FOLLOWERS:
      return { ...state, followers: action.payload };
    case types.LISTEN_USER_FOLLOWINGS:
      return { ...state, followings: action.payload };
    case types.SET_FOLLOW_USER:
      return { ...state, followingUser: true };
    case types.SET_UNFOLLOW_USER:
      return { ...state, followingUser: false };
    case types.CLEAR_FOLLOWERS_DATA:
      return { ...state, followers: [], followings: [] };
    case types.LISTEN_USER_NEWS_FEED:
      return { ...state, feed: action.payload };
    default:
      return state;
  }
};

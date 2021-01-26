import { types, LoadingAction } from '../actions/types';
import { LoadingState } from '../actions/loading';

const initialState: LoadingState = {
  loading: false,
  error: null,
  initialized: false,
};

export const loadingReducer = (
  state: LoadingState = initialState,
  action: LoadingAction
) => {
  switch (action.type) {
    case types.ASYNC_ACTION_START:
      return { ...state, loading: true };

    case types.ASYNC_ACTION_ERROR:
      return { ...state, loading: false, error: action.payload };

    case types.ASYNC_ACTION_FINISH:
      return { ...state, loading: false };

    case types.APP_LOADED:
      return { ...state, initialized: true };

    default:
      return state;
  }
};

import ActionTypes from '../Constants/action-types';

const initialState = {
  auth_status: false,
  current_user: null,
};

function rootReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATED:
      return getAuthStatus(state, action)
    case ActionTypes.CURRENT_USER:
      return getCurrentUser(state, action)
    case ActionTypes.RESET_STORE:
      return resetStore(state)
    default:
      return state;
  }
};

function getAuthStatus(state: any, action: any) {
  return {
    ...state,
    auth_status: action.auth_status
  }
}

function getCurrentUser(state: any, action: any) {
  return {
    ...state,
    current_user: action.current_user
  }
}

function resetStore(state: any) {
  return {
    ...state,
    auth_status: false,
    current_user: null,
  }
}

export default rootReducer;

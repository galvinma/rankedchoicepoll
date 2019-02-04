import ActionTypes from '../Constants/action-types';

const initialState = {
  auth_status: {auth_status: false},
  current_user: {current_user: null},
};

function rootReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATED:
      return getAuthStatus(state, action.auth_status)
    case ActionTypes.CURRENT_USER:
      return getCurrentUser(state, action.current_user)
    case ActionTypes.RESET_STORE:
      return resetStore(state)
    default:
      return state;
  }
};

function getAuthStatus(state: any, auth_status: boolean) {
  return {
    ...state,
    auth_status: auth_status
  }
}

function getCurrentUser(state: any, current_user: string) {
  return {
    ...state,
    current_user: current_user
  }
}

function resetStore(state: any) {
  return {
    ...state,
    auth_status: {auth_status: false},
    current_user: {current_user: null},
  }
}

export default rootReducer;

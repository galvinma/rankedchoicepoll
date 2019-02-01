//actions
import {
  AUTHENTICATED,
  CURRENT_USER,
  RESET_STORE,
  }

from "../Constants/action-types";

const initialState = {
  auth_status: {auth_status: false},
  current_user: {current_user: null},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return getAuthStatus(state, action.auth_status)
    case CURRENT_USER:
      return getCurrentUser(state, action.current_user)
    case RESET_STORE:
      return resetStore(state)
    default:
      return state;
  }
};

function getAuthStatus(state, auth_status) {
  return {
    ...state,
    auth_status: auth_status
  }
}

function getCurrentUser(state, current_user) {
  return {
    ...state,
    current_user: current_user
  }
}

function resetStore(state) {
  return {
    ...state,
    auth_status: {auth_status: false},
    current_user: {current_user: null},
  }
}

export default rootReducer;

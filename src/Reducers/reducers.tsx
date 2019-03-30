import ActionTypes from '../Constants/action-types';

const initialState = {
  auth_status: false,
  current_user: null,
  alert_color: "",
  alert_message: "",
};

function rootReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATED:
      return getAuthStatus(state, action)
    case ActionTypes.CURRENT_USER:
      return getCurrentUser(state, action)
    case ActionTypes.ALERT_COLOR:
      return getAlertColor(state, action)
    case ActionTypes.ALERT_MESSAGE:
      return getAlertMessage(state, action)
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

function getAlertColor(state: any, action: any) {
      console.log(action.alert_color)
  return {
    ...state,
    alert_color: action.alert_color
  }
}

function getAlertMessage(state: any, action: any) {
  console.log(action.alert_message)

  return {
    ...state,
    alert_message: action.alert_message
  }
}

function resetStore(state: any) {
  return {
    ...state,
    auth_status: false,
    current_user: null,
    alert_color: "",
    alert_message: "",
  }
}

export default rootReducer;

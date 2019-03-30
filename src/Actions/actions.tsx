import ActionTypes from '../Constants/action-types';

export const getAuthStatus = (auth_status: boolean) => ({
  type: ActionTypes.AUTHENTICATED,
  auth_status: auth_status
});

export const getCurrentUser = (current_user: string) => ({
  type: ActionTypes.CURRENT_USER,
  current_user: current_user
});

export const getAlertMessage = (alert_message: string) => ({
  type: ActionTypes.ALERT_MESSAGE,
  alert_message: alert_message
});

export const getAlertColor= (alert_color: string) => ({
  type: ActionTypes.ALERT_COLOR,
  alert_color: alert_color
});

export const resetStore = () => ({
  type: "RESET_STORE",
})

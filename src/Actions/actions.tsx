import ActionTypes from '../Constants/action-types';

export interface Auth { type: ActionTypes.AUTHENTICATED, auth_status: boolean}
export interface User { type: ActionTypes.CURRENT_USER, current_user: string}

export const getAuthStatus = (auth_status: boolean): Auth => ({
  type: ActionTypes.AUTHENTICATED,
  auth_status
});

export const getCurrentUser = (current_user: string): User => ({
  type: ActionTypes.CURRENT_USER,
  current_user
});

export const resetStore = () => ({
  type: "RESET_STORE",
})

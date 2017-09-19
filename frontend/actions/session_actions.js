import * as sessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';

export const receiveTEAMS = teams => ({
  type: RECEIVE_TEAMS,
  teams
});

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const signupUser = (userData) => dispatch => {
  sessionApiUtil.signup(userData)
    .then(
      (response) => dispatch(receiveCurrentUser(response)),
      (response) => dispatch(receiveSessionErrors(response.responseJSON))
    );
};

export const loginUser = (userData) => dispatch => {
  const ajax = sessionApiUtil.login(userData);
  let responseObj;

    ajax.then(
      (response) => {
        responseObj = response;
       return dispatch(receiveCurrentUser(response.user));
     },
      (response) => dispatch(receiveSessionErrors(response.responseJSON))
    ).then(
      () => dispatch(receiveTEAMS(responseObj.teams))
    );
};

export const logoutUser = () => dispatch => {
  sessionApiUtil.logout()
    .then(
      (response) => dispatch(receiveCurrentUser(null)),
      (response) => dispatch(receiveSessionErrors(response.responseJSON))
    );
};

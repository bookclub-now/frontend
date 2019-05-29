import { Amplitude, Constants } from 'expo';
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  GET_PROFILE,
  REGISTER_PUSH_NOTIFICATION_TOKEN,
  REMOVE_PUSH_NOTIFICATION_TOKEN,
  REMOVE_LOADING,
  PASSWORD_RECOVERY,
  VALIDATE_PASSWORD_RECOVERY,
  PASSWORD_RESET,
} from './types';
import { requestApi } from '../services/api';
import {
  signIn as signInService,
  signUp as signUpService,
  profile as profileService,
  passwordRecovery as passwordRecoveryService,
  validatePasswordRecovery as validatePasswordRecoveryService,
  resetPassword as resetPasswordService,
} from '../services/authentication/authenticationApi';
import {
  navigateToHome,
  navigateToLogin,
  navigateToResetPassword,
} from './navigation';
import { getNotificationToken } from '../services/PushNotifications';
import {
  registerNotificationToken as registerNotificationTokenService,
  removeNotificationToken as removeNotificationTokenService,
} from '../services/BookClubApi';

export const logOutAct = () => dispatch => {
  dispatch({
    type: SIGN_OUT,
  });
};

export const signIn = (params, form) => async dispatch => {
  Amplitude.logEvent('user.loggedin');
  const response = await dispatch(
    requestApi({
      type: SIGN_IN,
      method: signInService,
      params,
      form,
    }),
  );

  if (response.ok) {
    dispatch(getProfile());
    // Needed to login in simulator
    if (Constants.isDevice) {
      dispatch(registerNotificationToken());
    }
    navigateToHome();
  }
};

export const getProfile = () => async dispatch => {
  await dispatch(
    requestApi({
      type: GET_PROFILE,
      method: profileService,
    }),
  );
};

export const signUp = (params, form) => async dispatch => {
  Amplitude.logEvent('user.signedup');
  const response = await dispatch(
    requestApi({
      type: SIGN_UP,
      method: signUpService,
      params,
      form,
    }),
  );

  if (response.ok) dispatch(signIn(params, form));
};

export const registerNotificationToken = () => async dispatch => {
  const token = await getNotificationToken();
  await dispatch(
    requestApi({
      type: REGISTER_PUSH_NOTIFICATION_TOKEN,
      method: registerNotificationTokenService,
      params: {
        token,
      },
    }),
  );
};

export const disablePushNotifications = () => async dispatch => {
  const token = await getNotificationToken();
  await dispatch(
    requestApi({
      type: REMOVE_PUSH_NOTIFICATION_TOKEN,
      method: removeNotificationTokenService,
      params: {
        token,
      },
    }),
  );
};

export const signOut = () => async dispatch => {
  // Needed to logout in simulator
  if (Constants.isDevice) {
    dispatch(disablePushNotifications());
  }

  navigateToLogin();
  dispatch({
    type: SIGN_OUT,
  });
  Amplitude.logEvent('auth.logout');
};

export const recoverPassword = (params, form) => async dispatch => {
  const response = await dispatch(
    requestApi({
      type: PASSWORD_RECOVERY,
      method: passwordRecoveryService,
      params,
      form,
    }),
  );
  return response.ok;
};

export const resetPassword = (params, form) => async dispatch => {
  const response = await dispatch(
    requestApi({
      type: PASSWORD_RESET,
      method: resetPasswordService,
      params,
      form,
    }),
  );
  if (response.ok) {
    navigateToLogin();
  }
};

export const validatePasswordRecovery = params => async dispatch => {
  const response = await dispatch(
    requestApi({
      type: VALIDATE_PASSWORD_RECOVERY,
      method: validatePasswordRecoveryService,
      params,
    }),
  );
  if (response.ok) {
    navigateToResetPassword(params);
  } else {
    // eslint-disable-next-line no-alert
    alert('This request has expired');
  }
};

export const disableLoading = () => dispatch => {
  dispatch({
    type: REMOVE_LOADING,
  });
};

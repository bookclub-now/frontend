import {
  SIGN_IN_RESPONSE,
  SIGN_IN_ERROR,
  SIGN_OUT,
  SIGN_UP_REQUEST,
  SIGN_UP_RESPONSE,
  SIGN_UP_ERROR,
  SIGN_IN_REQUEST,
  GET_PROFILE_REQUEST,
  GET_PROFILE_RESPONSE,
  GET_PROFILE_ERROR,
  PASSWORD_RECOVERY_REQUEST,
  PASSWORD_RECOVERY_RESPONSE,
  PASSWORD_RECOVERY_ERROR,
  REGISTER_PUSH_NOTIFICATION_TOKEN_RESPONSE,
  REGISTER_PUSH_NOTIFICATION_TOKEN_ERROR,
  REMOVE_PUSH_NOTIFICATION_TOKEN_RESPONSE,
  REMOVE_PUSH_NOTIFICATION_TOKEN_ERROR,
  REMOVE_PUSH_NOTIFICATION_TOKEN_REQUEST,
  REGISTER_PUSH_NOTIFICATION_TOKEN_REQUEST,
  REMOVE_LOADING,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_RESPONSE,
  PASSWORD_RESET_ERROR,
  VALIDATE_PASSWORD_RECOVERY_REQUEST,
  VALIDATE_PASSWORD_RECOVERY_RESPONSE,
  VALIDATE_PASSWORD_RECOVERY_ERROR,
} from '../actions/types';

const initialState = {
  error: null,
  user: null,
  loading: false,
  token: null,
  settings: {
    notifications: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SIGN_IN_RESPONSE:
      return {
        ...state,
        error: null,
        loading: false,
        token: action.response.body.token,
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        user: null,
        token: null,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case SIGN_UP_RESPONSE:
      return {
        ...state,
        error: null,
        loading: false,
        user: action.response.body.user,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        error: action.error.error.errors,
        loading: false,
        user: null,
      };
    case GET_PROFILE_REQUEST:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_PROFILE_RESPONSE:
      return {
        ...state,
        error: null,
        loading: false,
        user: action.response.body,
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case REGISTER_PUSH_NOTIFICATION_TOKEN_REQUEST:
      return {
        ...state,
        error: null,
        // settings: { notifications: true },
      };
    case REGISTER_PUSH_NOTIFICATION_TOKEN_RESPONSE:
      return {
        ...state,
        error: null,
        loading: false,
        settings: { notifications: true },
      };
    case REGISTER_PUSH_NOTIFICATION_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        settings: { notifications: false },
        error: action.error,
      };
    case REMOVE_PUSH_NOTIFICATION_TOKEN_REQUEST:
      return {
        ...state,
        error: null,
        // settings: { notifications: false },
      };
    case REMOVE_PUSH_NOTIFICATION_TOKEN_RESPONSE:
      return {
        ...state,
        error: null,
        loading: false,
        settings: { notifications: false },
      };
    case REMOVE_PUSH_NOTIFICATION_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case PASSWORD_RECOVERY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PASSWORD_RECOVERY_RESPONSE:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case PASSWORD_RECOVERY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case PASSWORD_RESET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PASSWORD_RESET_RESPONSE:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case PASSWORD_RESET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case VALIDATE_PASSWORD_RECOVERY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case VALIDATE_PASSWORD_RECOVERY_RESPONSE:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case VALIDATE_PASSWORD_RECOVERY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case REMOVE_LOADING:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

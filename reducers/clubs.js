import {
  CREATE_CLUB,
  GET_CLUBS,
  SIGN_OUT,
  GET_COMMENTS_COUNT,
  ADD_LAST_SEEN,
  REMOVE_LOADING,
} from '../actions/types';
import Club from '../models/Club';

const initialState = {
  clubs: [],
  commentsCount: {},
  lastSeen: {},
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_CLUBS}_REQUEST`:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${GET_CLUBS}_RESPONSE`:
      return {
        ...state,
        clubs: action.response.body
          .map(club => Club.parseResponse(club))
          .reverse(),
        loading: false,
        error: null,
      };
    case `${GET_CLUBS}_ERROR`:
      return {
        ...state,
        clubs: [],
        loading: false,
        error: action.error,
      };
    case `${CREATE_CLUB}_REQUEST`:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${CREATE_CLUB}_RESPONSE`:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case `${CREATE_CLUB}_ERROR`:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case `${GET_COMMENTS_COUNT}_REQUEST`:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${GET_COMMENTS_COUNT}_RESPONSE`:
      return {
        ...state,
        commentsCount: {
          ...state.commentsCount,
          [action.params.id]: action.response.body,
        },
        loading: false,
        error: null,
      };
    case `${GET_COMMENTS_COUNT}_ERROR`:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_LAST_SEEN:
      return {
        ...state,
        lastSeen: {
          ...state.lastSeen,
          ...action.payload,
        },
      };
    case SIGN_OUT:
      return initialState;
    case REMOVE_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

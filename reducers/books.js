import {
  SEARCH_SELECTED_BOOK,
  SEARCH_BOOK,
  CLEAR_SEARCH,
  FETCH_MORE_RESULTS,
  REMOVE_LOADING,
} from '../actions/types';
import Book from '../models/Book';
import SearchResult from '../models/SearchResult';

const initialState = {
  books: [],
  searchResults: [],
  query: '',
  searchSelectedBook: new Book(),
  searching: false,
  fetchingMore: false,
  noResults: false,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SEARCH_SELECTED_BOOK}_REQUEST`:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case `${SEARCH_SELECTED_BOOK}_RESPONSE`:
      return {
        ...state,
        searchSelectedBook: Book.parseResponse(
          action.response.body,
          0,
          action.params.authors,
        ),
        loading: false,
        error: null,
      };
    case `${SEARCH_SELECTED_BOOK}_ERROR`:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case `${SEARCH_BOOK}_REQUEST`:
      return {
        ...state,
        searchResults: [],
        searching: true,
        error: action.error,
        query: action.params.query,
      };
    case `${SEARCH_BOOK}_RESPONSE`:
      return {
        ...state,
        searchResults: SearchResult.parseResponse(action.response.body.items),
        noResults:
          SearchResult.parseResponse(action.response.body.items).length === 0,
        searching: false,
        error: null,
      };
    case `${SEARCH_BOOK}_ERROR`:
      return {
        ...state,
        searchResults: [],
        noResults: false,
        searching: false,
        error: action.error,
      };
    case `${FETCH_MORE_RESULTS}_REQUEST`:
      return {
        ...state,
        fetchingMore: true,
        error: action.error,
        query: action.params.query,
      };
    case `${FETCH_MORE_RESULTS}_RESPONSE`:
      return {
        ...state,
        searchResults: [
          ...state.searchResults,
          ...SearchResult.parseResponse(action.response.body.items),
        ],
        fetchingMore: false,
        error: null,
      };
    case `${FETCH_MORE_RESULTS}_ERROR`:
      return {
        ...state,
        fetchingMore: false,
        error: action.error,
      };
    case CLEAR_SEARCH:
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

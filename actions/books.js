import { debounce } from 'lodash';
import {
  SEARCH_SELECTED_BOOK,
  SEARCH_BOOK,
  CLEAR_SEARCH,
  FETCH_MORE_RESULTS,
} from './types';
import { searchBooks, getBook } from '../services/GoogleBooksApi';
import { requestApi } from '../services/api';
import Book from '../models/Book';

const debouncedSearch = debounce(
  async (dispatch, params) =>
    dispatch(
      await requestApi({
        type: SEARCH_BOOK,
        method: searchBooks,
        params: {
          ...params,
        },
      }),
    ),
  300,
);

export const searchBook = params => dispatch => {
  if (params.query) {
    debouncedSearch(dispatch, params);
  } else {
    debouncedSearch.cancel();
    dispatch({
      type: CLEAR_SEARCH,
    });
  }
};

export const fetchMoreResults = params => async dispatch =>
  dispatch(
    await requestApi({
      type: FETCH_MORE_RESULTS,
      method: searchBooks,
      params: {
        ...params,
      },
    }),
  );

export const selectSearchBook = book => async dispatch =>
  dispatch(
    await requestApi({
      type: SEARCH_SELECTED_BOOK,
      method: getBook,
      params: {
        query: book.id,
      },
    }),
  );

export const clearSelectedSearchBook = () => dispatch =>
  dispatch({
    type: SEARCH_SELECTED_BOOK,
    payload: new Book(),
  });

export const clearSearch = () => dispatch =>
  dispatch({
    type: CLEAR_SEARCH,
  });

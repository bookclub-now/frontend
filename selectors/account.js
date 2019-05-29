import { createSelector } from 'reselect';

const getToken = account => account.token;

export const isLoggedIn = createSelector(
  [getToken],
  token => !!token,
);

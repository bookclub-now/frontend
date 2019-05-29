import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as form } from 'redux-form';

import app from './app';
import books from './books';
import clubs from './clubs';
import account from './account';

const persistConfig = {
  key: 'root',
  storage,
};

export default persistReducer(
  persistConfig,
  combineReducers({ app, books, clubs, account, form }),
);

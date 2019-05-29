import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Amplitude, DangerZone } from 'expo';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import Config from './config';
import loggingMiddleware from './src/middleware/loggingMiddleware';
import { navigationRouteChange } from './src/actions/nav';
import NavigationService from './src/services/NavigationService';
import AppNavigator from './src/navigation/AppNavigator';
import AppReducer from './src/reducers';
import { parseUniversalLinks } from './src/actions/clubs';
import { disableLoading } from './src/actions/account';

export default class BookClub extends React.Component {
  constructor() {
    super();
    this._createStore();
    Amplitude.initialize(Config.amplitudeApiKey);
  }

  componentDidMount() {
    this.handleOpenURL(this.store);
    this.store.dispatch(disableLoading());
  }

  handleOpenURL = store => {
    try {
      DangerZone.Branch.subscribe(bundle => {
        if (bundle && bundle.params && !bundle.error) {
          store.dispatch(
            parseUniversalLinks(
              bundle.params.$canonical_identifier,
              bundle.uri,
            ),
          );
        }
      });
    } catch (error) {
      // TODO: handle this explicitly by status code and remove the throw on error
    }
  };

  _onNavigationStateChange = (prevState, currentState) => {
    const params = NavigationService.getActiveRouteParams(currentState);
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(params));
    const currentScreen = NavigationService.getActiveRouteName(currentState);
    const prevScreen = NavigationService.getActiveRouteName(prevState);
    if (prevScreen !== currentScreen) {
      this.store.dispatch(navigationRouteChange(currentScreen));
    }
  };

  _createStore() {
    const middlewares = [thunk, loggingMiddleware];
    if (process.env.NODE_ENV === 'development') {
      const { logger } = require('redux-logger');
      middlewares.push(logger);
    }

    if (__DEV__) {
      const Reactotron = require('./ReactotronConfig');
      this.store = Reactotron.default.createStore(
        AppReducer,
        composeWithDevTools(applyMiddleware(...middlewares)),
      );
      Reactotron.default.connect();
    } else {
      this.store = createStore(
        AppReducer,
        composeWithDevTools(applyMiddleware(...middlewares)),
      );
    }

    this.persistor = persistStore(this.store);
  }

  render() {
    return (
      <View style={styles.container}>
        <Provider store={this.store}>
          <PersistGate persistor={this.persistor}>
            <React.Fragment>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
                onNavigationStateChange={this._onNavigationStateChange}
              />
            </React.Fragment>
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

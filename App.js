import React from 'react';
import { AppLoading, Asset, Font, Icon, Amplitude } from 'expo';
import Sentry from 'sentry-expo';
import BookClub from './BookClub';
import Config from './config';

if (__DEV__) {
  import('./ReactotronConfig');
}

export default class App extends React.Component {
  constructor() {
    super();
    Amplitude.initialize(Config.amplitudeApiKey);
    Sentry.config(Config.sentryDns).install();
  }

  state = {
    isLoadingComplete: false,
  };

  _loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
        'Raleway-Light': require('./assets/fonts/Raleway-Light.ttf'),
        'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
        'Raleway-Thin': require('./assets/fonts/Raleway-Thin.ttf'),
        'Muli-Regular': require('./assets/fonts/Muli-Regular.ttf'),
        'Muli-Light': require('./assets/fonts/Muli-Light.ttf'),
        'Muli-Bold': require('./assets/fonts/Muli-Bold.ttf'),
      }),
    ]);

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    // eslint-disable-next-line no-console
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    // eslint-disable-next-line react/prop-types
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return <BookClub />;
  }
}

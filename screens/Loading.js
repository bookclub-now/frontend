import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { Notifications } from 'expo';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoggedIn } from '../selectors/account';
import { selectNavigator } from '../actions/navigation';

const { height, width } = Dimensions.get('window');

class Loading extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    navigation: PropTypes.instanceOf(Object).isRequired,
  };

  componentDidMount() {
    const { authenticated, navigation } = this.props;
    selectNavigator(authenticated, navigation);
    this._notificationSubscription = Notifications.addListener(notification =>
      selectNavigator(authenticated, navigation, notification.data),
    );
  }

  render() {
    return (
      <Image
        style={{ flex: 1, height, width }}
        source={require('../assets/images/splash.png')}
      />
    );
  }
}

const mapStateToProps = ({ account }) => ({
  authenticated: isLoggedIn(account),
});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Loading),
);

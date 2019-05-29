// Remove in V2
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import idx from 'idx';
import NavBarHeader from '../components/common/nav-bar-header/NavBarHeader';
import { responsiveSize } from '../utils/dimensions';
import FlatInput from '../components/common/flat-input/FlatInput';
import FlatButton from '../components/common/flat-button/FlatButton';
import Spacing from '../components/common/spacing/Spacing';
import {
  signOut,
  registerNotificationToken,
  disablePushNotifications,
} from '../actions/account';

import Colors from '../constants/Colors';
import NavigationPropTypes from '../propTypes/NavigationPropTypes';
import { navigateToTermsOfServices } from '../actions/navigation';
// import SettingsItem from '../components/common/settings-item/SettingsItem';

class Profile extends React.Component {
  static propTypes = {
    navigation: NavigationPropTypes.isRequired,
    account: PropTypes.instanceOf(Object).isRequired,
    signOutAction: PropTypes.func.isRequired,
    registerNotificationTokenAction: PropTypes.func.isRequired,
    disablePushNotificationsAction: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.scrollView = React.createRef();
    const { account } = this.props;
    this.state = {
      notifications: !!idx(account, _ => _.settings.notifications),
    };
  }

  handleNotificationsSettings = enabled => {
    const {
      registerNotificationTokenAction,
      disablePushNotificationsAction,
    } = this.props;
    this.setState({ notifications: enabled }, () =>
      enabled
        ? registerNotificationTokenAction()
        : disablePushNotificationsAction(),
    );
  };

  render() {
    const { navigation, account, signOutAction } = this.props;
    // const { notifications } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <NavBarHeader
          title="Profile"
          leftIcon="arrow-back"
          onPressIconLeft={() => navigation.goBack()}
        />
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView
            style={{
              backgroundColor: Colors.global.gradientGray,
            }}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
          >
            <View style={{ backgroundColor: 'white' }}>
              <Spacing size="default" />
              <FlatInput
                placeHolder="Name"
                label="Name"
                value={`${account.user.first_name} ${account.user.last_name}`}
                editable={false}
              />
              <Spacing size="default" />
              <FlatInput
                placeHolder="Email"
                label="Email"
                value={account.user.email}
                editable={false}
              />
              <Spacing size="default" />
              <FlatInput
                placeHolder="Phone #"
                label="Phone #"
                value={account.user.phone_number}
                editable={false}
              />
              <Spacing size="semiThin" />
              {/* <SettingsItem
                value={notifications}
                label="Notifications"
                onValueChange={this.handleNotificationsSettings}
              /> */}
              <Spacing size="semiThin" color={Colors.global.gradientGray} />
              <FlatButton
                label="View Terms of Service"
                onPress={() => navigateToTermsOfServices()}
              />
              <FlatButton
                label="Log Out"
                onPress={() => signOutAction()}
                color={Colors.text.red}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ account }) => ({
  account,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerNotificationTokenAction: registerNotificationToken,
      disablePushNotificationsAction: disablePushNotifications,
      signOutAction: signOut,
    },
    dispatch,
  );

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Profile),
);

const styles = StyleSheet.create({
  avoidKeyboard: {
    flex: 0.6,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.global.white,
  },
  backgroundGradient: {
    flex: 1,
  },
  wrapperButton: {
    flex: 0.5,
    backgroundColor: 'blue',
  },
  wrapperText: {
    height: responsiveSize(100),
    position: 'absolute',
    top: '35%',
    width: '65%',
    alignSelf: 'center',
  },
  shadow: {
    width: 320,
    height: 152,
    shadowColor: Colors.global.opacityBackground,
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    position: 'absolute',
    bottom: responsiveSize(110),
    alignSelf: 'center',
    alignItems: 'center',
  },
});

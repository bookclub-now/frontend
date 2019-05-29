/* eslint-disable react/prop-types */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Spacing from '../components/common/spacing/Spacing';
import Input from '../components/fom-fields/Input';

import Colors from '../constants/Colors';
import NavBarHeader from '../components/common/nav-bar-header/NavBarHeader';
import Button from '../components/common/button/Button';
import { resetPassword } from '../actions/account';
import { required, passwordConfirmation } from '../utils/validations';

const Container = Animated.createAnimatedComponent(SafeAreaView);

class PasswordReset extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.scrollView = React.createRef();
    this.inputs = {};
  }

  state = {
    opacity: new Animated.Value(0),
  };

  componentDidMount() {
    const { opacity } = this.state;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  focusField = id => {
    this.inputs[id].focus();
  };

  _onPasswordReset = values => {
    const { resetPasswordAction, form, navigation } = this.props;
    const params = navigation.getParam('params');

    resetPasswordAction({ ...params, ...values }, form);
  };

  render() {
    const { opacity } = this.state;
    const { navigation, account, handleSubmit } = this.props;
    return (
      <Container
        style={{
          ...styles.container,
          opacity,
        }}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <LinearGradient
            colors={[Colors.global.white, Colors.global.gradientGray]}
            style={styles.backgroundGradient}
          >
            <NavBarHeader
              title="Reset Password"
              leftIcon="close"
              onPressIconLeft={() => navigation.goBack()}
            />
            <ScrollView
              ref={ref => {
                this.scrollView = ref;
              }}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
            >
              <Spacing size="semiThin" />
              <Field
                name="password"
                type="text"
                component={Input}
                label="password"
                validate={[required]}
                iconName="lock"
                editable={!account.loading}
                secureTextEntry
                setRef={input => {
                  this.inputs.field = input;
                }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.focusField('field2');
                }}
              />
              <Spacing size="default" />
              <Field
                name="password_confirmation"
                type="text"
                component={Input}
                label="password confirmation"
                validate={[required, passwordConfirmation]}
                iconName="lock"
                editable={!account.loading}
                secureTextEntry
                setRef={input => {
                  this.inputs.field2 = input;
                }}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(this._onPasswordReset)}
              />
              <Spacing size="default" />
            </ScrollView>
            <Button
              style={styles.button}
              textColor={Colors.text.white}
              buttonColor={Colors.global.primary}
              typography="midTitle"
              text="Reset Password & Log In"
              onPress={handleSubmit(this._onPasswordReset)}
              loading={account.loading}
            />
          </LinearGradient>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = ({ account }) => ({
  account,
  user: {
    isLoggedIn: resetPassword(account),
  },
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetPasswordAction: resetPassword,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'passwordReset',
  })(PasswordReset),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.global.white,
  },
  backgroundGradient: {
    flex: 1,
  },
  button: {
    display: 'flex',
    borderRadius: 0,
  },
});

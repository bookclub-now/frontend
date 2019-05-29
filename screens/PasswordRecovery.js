/* eslint-disable react/prop-types */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Spacing from '../components/common/spacing/Spacing';

import Colors from '../constants/Colors';
import NavBarHeader from '../components/common/nav-bar-header/NavBarHeader';
import Input from '../components/fom-fields/Input';
import Typography from '../components/common/typography/Typography';
import Button from '../components/common/button/Button';
import { recoverPassword } from '../actions/account';
import { isLoggedIn } from '../selectors/account';
import { required, email as emailValidation } from '../utils/validations';

const Container = Animated.createAnimatedComponent(SafeAreaView);

const INSTRUCTIONS = `Enter the email address associated with \n your account. We will send you an email \n with a link to reset your password.`;
const SUCCESS_MESSAGE = `An email with a link to reset your password \n has been sent to`;

class PasswordRecovery extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.inputs = {};
  }

  state = {
    opacity: new Animated.Value(0),
    showSuccessMessage: false,
    email: '',
  };

  componentDidMount() {
    const { opacity } = this.state;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  _onPasswordRecovery = async values => {
    const { recoverPasswordAction, form } = this.props;

    const showSuccessMessage = await recoverPasswordAction(values, form);
    this.setState({ showSuccessMessage, email: values.email });
  };

  render() {
    const { opacity, showSuccessMessage, email } = this.state;
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
              title="Forgot Password"
              leftIcon="close"
              onPressIconLeft={() => navigation.pop()}
            />
            <ScrollView
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
            >
              {showSuccessMessage ? (
                <View>
                  <Spacing size="large" />
                  <Typography variant="midBody" color="primary">
                    Reset link sent
                  </Typography>
                  <Spacing size="default" />
                  <Typography variant="messages" color="secundary">
                    {`${SUCCESS_MESSAGE} ${email}.`}
                  </Typography>
                </View>
              ) : (
                <View>
                  <Spacing size="thick" />
                  <Typography variant="messages" color="secundary">
                    {INSTRUCTIONS}
                  </Typography>
                  <Spacing size="thick" />
                  <Field
                    name="email"
                    type="text"
                    component={Input}
                    label="email"
                    validate={[required, emailValidation]}
                    iconName="mail"
                    editable={!account.loading}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    setRef={input => {
                      this.inputs.field = input;
                    }}
                    returnKeyType="done"
                    onSubmitEditing={() =>
                      handleSubmit(this._onPasswordRecovery)
                    }
                  />
                  <Spacing size="default" />
                </View>
              )}
            </ScrollView>
            <Button
              style={styles.button}
              textColor={Colors.text.white}
              buttonColor={Colors.global.primary}
              typography="midTitle"
              text={showSuccessMessage ? 'Done' : 'Send Reset Link'}
              onPress={
                showSuccessMessage
                  ? () => navigation.goBack()
                  : handleSubmit(this._onPasswordRecovery)
              }
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
    isLoggedIn: isLoggedIn(account),
  },
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      recoverPasswordAction: recoverPassword,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'passwordRecovery',
  })(PasswordRecovery),
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

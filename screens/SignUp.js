/* eslint-disable react/prop-types */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import Spacing from '../components/common/spacing/Spacing';

import Colors from '../constants/Colors';
import Typography from '../components/common/typography/Typography';
import Input from '../components/fom-fields/Input';
import Button from '../components/common/button/Button';
import { isLoggedIn } from '../selectors/account';
import { signUp } from '../actions/account';
import { required, passwordConfirmation, email } from '../utils/validations';
import { responsiveSize } from '../utils/dimensions';

class SignUp extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = { scrollPosition: 0 };
  }

  focusField = id => {
    this.inputs[id].focus();
  };

  _scroll = () => {
    const { scrollPosition } = this.state;
    this.scrollView.scrollTo({ x: 0, y: scrollPosition + 5, animated: true });
    this.setState({ scrollPosition: scrollPosition + responsiveSize(60) });
  };

  _onSignUp = async values => {
    const { signUpAction, form } = this.props;

    signUpAction(values, form);
  };

  render() {
    const { navigation, account, handleSubmit } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <LinearGradient
            colors={[Colors.global.white, Colors.global.gradientGray]}
            style={styles.backgroundGradient}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons
                  name="arrow-back"
                  color={Colors.global.primary}
                  size={30}
                />
              </TouchableOpacity>
              <Typography variant="xLargeBody" color="secundary">
                Sign Up
              </Typography>
              <View style={{ width: responsiveSize(30) }} />
            </View>
            <Spacing size="semiThin" />
            <ScrollView
              ref={ref => {
                this.scrollView = ref;
              }}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
            >
              <Spacing size="default" />
              <Field
                name="first_name"
                type="text"
                component={Input}
                label="first name"
                validate={[required]}
                iconName="person"
                editable={!account.loading}
                setRef={input => {
                  this.inputs.field1 = input;
                }}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.focusField('field2');
                }}
              />
              <Spacing size="default" />
              <Field
                name="last_name"
                type="text"
                component={Input}
                label="last name"
                validate={[required]}
                iconName="person"
                editable={!account.loading}
                setRef={input => {
                  this.inputs.field2 = input;
                }}
                returnKeyType="next"
                onFocusCallback={() => this._scroll()}
                onSubmitEditing={() => {
                  this.focusField('field3');
                }}
              />
              <Spacing size="default" />
              <Field
                name="phone_number"
                type="text"
                component={Input}
                label="phone"
                validate={[required]}
                iconName="phone-iphone"
                editable={!account.loading}
                keyboardType="number-pad"
                setRef={input => {
                  this.inputs.field3 = input;
                }}
                returnKeyType="next"
                onFocusCallback={() => this._scroll()}
                onSubmitEditing={() => {
                  this.focusField('field4');
                }}
              />
              <Spacing size="default" />
              <Field
                name="email"
                type="text"
                component={Input}
                label="email"
                validate={[required, email]}
                iconName="mail"
                editable={!account.loading}
                keyboardType="email-address"
                autoCapitalize="none"
                setRef={input => {
                  this.inputs.field4 = input;
                }}
                returnKeyType="next"
                onFocusCallback={() => this._scroll()}
                onSubmitEditing={() => {
                  this.focusField('field5');
                }}
              />
              <Spacing size="default" />
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
                  this.inputs.field5 = input;
                }}
                returnKeyType="next"
                onFocusCallback={() =>
                  this.scrollView.scrollToEnd({ animated: true })
                }
                onSubmitEditing={() => {
                  this.focusField('field6');
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
                  this.inputs.field6 = input;
                }}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(this._onSignUp)}
              />
              <Spacing size="default" />
            </ScrollView>
            <Button
              style={styles.button}
              textColor={Colors.text.white}
              buttonColor={Colors.global.primary}
              typography="midTitle"
              text="Sign Up"
              onPress={handleSubmit(this._onSignUp)}
              loading={account.loading}
            />
          </LinearGradient>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
      signUpAction: signUp,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'signUpForm',
  })(SignUp),
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
  },
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

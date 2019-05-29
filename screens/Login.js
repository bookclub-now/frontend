/* eslint-disable react/prop-types */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { responsiveSize } from '../utils/dimensions';
import Spacing from '../components/common/spacing/Spacing';

import Colors from '../constants/Colors';
import Typography from '../components/common/typography/Typography';
import InputTextField from '../components/common/input-text-field/InputTextField';
import Button from '../components/common/button/Button';
import { signIn } from '../actions/account';
import Header from '../components/home/header/Header';
import { isLoggedIn } from '../selectors/account';

const Container = Animated.createAnimatedComponent(SafeAreaView);

class Login extends React.Component {
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
    email: '',
    password: '',
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

  _onLogin = () => {
    const { signInAction } = this.props;
    signInAction(this.state);
  };

  render() {
    const { email, password, opacity } = this.state;
    const { navigation, account } = this.props;
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
            <Header />
            <Spacing size="thick" />
            <ScrollView
              ref={ref => {
                this.scrollView = ref;
              }}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
            >
              <Spacing size="semiThin" />
              <Typography variant="xLargeBody" color="secundary">
                Log In
              </Typography>
              <Spacing size="default" />
              <InputTextField
                iconName="mail"
                placeHolder="email"
                onChangeText={text => this.setState({ email: text })}
                value={email}
                keyboardType="email-address"
                editable={!account.loading}
                errors={!!account.error}
                autoCapitalize="none"
                inputProps={{
                  setRef: input => {
                    this.inputs.field1 = input;
                  },
                  returnKeyType: 'next',
                  onSubmitEditing: () => {
                    this.focusField('field2');
                  },
                }}
              />
              <Spacing size="default" />
              <InputTextField
                iconName="lock"
                placeHolder="password"
                onChangeText={text => this.setState({ password: text })}
                value={password}
                secureTextEntry
                editable={!account.loading}
                errors={!!account.error}
                inputProps={{
                  setRef: input => {
                    this.inputs.field2 = input;
                  },
                  returnKeyType: 'done',
                  onSubmitEditing: this._onLogin,
                }}
              />
              <Spacing size="default" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: '5%',
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => navigation.navigate('SignUp')}
                >
                  <Typography variant="smallBody" color="secundary">
                    {`New User? `}
                  </Typography>
                  <Typography variant="smallBody" color="primary">
                    Sign Up
                  </Typography>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => navigation.navigate('PasswordRecovery')}
                >
                  <Typography variant="smallBody" color="primary">
                    Forgot password
                  </Typography>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <Button
              style={styles.button}
              textColor={Colors.text.white}
              buttonColor={Colors.global.primary}
              typography="midTitle"
              text="Log In"
              onPress={this._onLogin}
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
      signInAction: signIn,
    },
    dispatch,
  );

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.global.white,
  },
  backgroundGradient: {
    flex: 1,
    paddingTop: responsiveSize(85),
  },
  button: {
    display: 'flex',
    borderRadius: 0,
  },
});

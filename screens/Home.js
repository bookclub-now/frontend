/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/home/header/Header';
import NavBar from '../components/nav-bar/NavBar';
import Colors from '../constants/Colors';
import BookCarousel from '../components/home/book-carousel/BookCarousel';
import InitialMessage from '../components/home/initial-message/InitialMessage';
import { isLoggedIn } from '../selectors/account';
import { getClubs } from '../actions/clubs';
import { getProfile } from '../actions/account';

class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    opacity: new Animated.Value(0),
  };

  static propTypes = {
    clubs: PropTypes.instanceOf(Array).isRequired,
  };

  componentDidMount() {
    const { getClubsAction, getProfileAction } = this.props;

    getClubsAction();
    getProfileAction();

    const { opacity } = this.state;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { clubs } = this.props;
    const { opacity } = this.state;
    return (
      <Animated.View
        style={{
          ...styles.container,
          opacity,
        }}
      >
        <LinearGradient
          colors={[Colors.global.white, Colors.global.gradientGray]}
          style={styles.backgroundGradient}
        >
          <Header />
          {clubs.length > 0 ? <BookCarousel /> : <InitialMessage />}
          <NavBar />
        </LinearGradient>
      </Animated.View>
    );
  }
}

const mapStateToProps = ({ clubs, account }) => ({
  clubs: clubs.clubs,
  user: {
    isLoggedIn: isLoggedIn(account),
  },
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getClubsAction: getClubs,
      getProfileAction: getProfile,
    },
    dispatch,
  );

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Home),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.global.white,
  },
  backgroundGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

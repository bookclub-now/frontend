import React from 'react';
import { WebView, SafeAreaView } from 'react-native';
import NavBarHeader from '../components/common/nav-bar-header/NavBarHeader';
import NavigationPropTypes from '../propTypes/NavigationPropTypes';
import Colors from '../constants/Colors';

const Terms = ({ navigation }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: Colors.global.white }}>
    <NavBarHeader
      title="Terms of Service"
      leftIcon="arrow-back"
      onPressIconLeft={() => navigation.goBack()}
    />
    <WebView
      source={{ uri: 'https://www.bookclubnow.com/terms-of-service' }}
      style={{ flex: 1 }}
    />
  </SafeAreaView>
);

Terms.propTypes = {
  navigation: NavigationPropTypes.isRequired,
};

Terms.navigationOptions = {
  header: null,
};

export default Terms;

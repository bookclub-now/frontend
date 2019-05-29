/* eslint-disable react/prop-types */
import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../constants/Colors';

export default class Welcome extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.global.opacityBackground,
  },
});

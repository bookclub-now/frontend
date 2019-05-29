import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';

const IMAGE_LOGO = require('../../../assets/images/home/logo.png');

const Header = () => (
  <View style={styles.header}>
    <Image style={styles.logo} source={IMAGE_LOGO} />
  </View>
);

export default Header;

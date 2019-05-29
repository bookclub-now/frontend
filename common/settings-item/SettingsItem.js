import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Switch } from 'react-native';
import styles from './styles';

const SettingsItem = ({ label, ...props }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Switch {...props} />
  </View>
);

SettingsItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default SettingsItem;

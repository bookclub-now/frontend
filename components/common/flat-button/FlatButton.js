import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../constants/Colors';
import styles from './styles';

const FlatButton = ({ label, onPress, color }) => (
  <TouchableOpacity style={styles.flatButton} onPress={onPress}>
    <Text style={{ ...styles.text, color }}>{label}</Text>
  </TouchableOpacity>
);

FlatButton.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  onPress: PropTypes.func,
};

FlatButton.defaultProps = {
  onPress: () => {},
  color: Colors.text.primary,
};

export default FlatButton;

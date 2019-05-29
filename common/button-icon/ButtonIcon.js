import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

const ButtonIcon = ({ name, color, onPress, style, size }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }}
  >
    <MaterialIcons
      name={name}
      color={Colors.global[color]}
      size={size}
      style={style}
    />
  </TouchableOpacity>
);

ButtonIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};

ButtonIcon.defaultProps = {
  onPress: () => {},
  style: {},
};

export default ButtonIcon;

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { WaveIndicator } from 'react-native-indicators';
import styles from './styles';
import typographyStyles from '../typography/styles';

const Button = ({
  text,
  textColor,
  buttonColor,
  onPress,
  style,
  typography,
  loading,
}) =>
  loading ? (
    <View
      style={[styles.button, { backgroundColor: buttonColor }, style]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <WaveIndicator color="white" />
    </View>
  ) : (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }, style]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Text
        style={[
          styles.label,
          {
            color: textColor,
            fontFamily: 'Raleway-Regular',
            ...typographyStyles[typography],
          },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );

Button.propTypes = {
  textColor: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  text: PropTypes.string.isRequired,
  typography: PropTypes.string,
  loading: PropTypes.bool,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};

Button.defaultProps = {
  onPress: () => {},
  typography: '',
  style: {},
  loading: false,
};

export default Button;

import React from 'react';
import { View, Platform, NativeModules } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import ButtonIcon from '../button-icon/ButtonIcon';
import Typography from '../typography/Typography';
import { responsiveSize } from '../../../utils/dimensions';

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = StatusBarManager.HEIGHT;

const NavBarHeader = ({
  title,
  leftIcon,
  rightIcon,
  onPressIconLeft,
  onPressIconRight,
}) => (
  <View
    style={{
      ...styles.header,
      marginTop: Platform.OS === 'android' ? STATUSBAR_HEIGHT : null,
    }}
  >
    {leftIcon.length > 0 ? (
      <ButtonIcon
        name={leftIcon}
        color="primary"
        size={28}
        onPress={onPressIconLeft}
      />
    ) : (
      <View style={{ width: responsiveSize(28) }} />
    )}
    <Typography
      variant="midBody"
      color="dark"
      ellipsizeMode="tail"
      numberOfLines={1}
      width={responsiveSize(250)}
    >
      {title}
    </Typography>
    {rightIcon.length > 0 ? (
      <ButtonIcon
        name={rightIcon}
        color="primary"
        size={28}
        onPress={onPressIconRight}
      />
    ) : (
      <View style={{ width: responsiveSize(28) }} />
    )}
  </View>
);

NavBarHeader.propTypes = {
  onPressIconRight: PropTypes.func,
  onPressIconLeft: PropTypes.func,
  title: PropTypes.string.isRequired,
  rightIcon: PropTypes.string,
  leftIcon: PropTypes.string,
};

NavBarHeader.defaultProps = {
  onPressIconRight: () => {},
  onPressIconLeft: () => {},
  rightIcon: '',
  leftIcon: '',
};

export default NavBarHeader;

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import layout from '../../../constants/Layout';

const Spacing = ({ size, horizontal, color }) => {
  const spacingSize = layout.spacing[size];
  const spacing = spacingSize;
  return !horizontal ? (
    <View style={{ height: spacing, width: '100%', backgroundColor: color }} />
  ) : (
    <View style={{ height: '100%', width: spacing, backgroundColor: color }} />
  );
};

Spacing.propTypes = {
  size: PropTypes.string.isRequired,
  horizontal: PropTypes.bool,
  color: PropTypes.string,
};

Spacing.defaultProps = {
  horizontal: false,
  color: 'transparent',
};

export default Spacing;

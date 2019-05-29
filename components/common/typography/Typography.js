import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import colors from '../../../constants/Colors';
import variants from './styles';

const Typography = ({
  color,
  variant,
  children,
  numberOfLines,
  textAlign,
  textStyle,
  ellipsizeMode,
  width,
}) => (
  <Text
    style={[
      {
        color: colors.text[color],
        ...variants[variant],
        textAlign,
        width,
      },
      textStyle,
    ]}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}
  >
    {children}
  </Text>
);

Typography.propTypes = {
  color: PropTypes.string,
  variant: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  numberOfLines: PropTypes.number,
  textAlign: PropTypes.string,
  textStyle: PropTypes.any,
  ellipsizeMode: PropTypes.any,
  width: PropTypes.number,
};

Typography.defaultProps = {
  color: 'primary',
  numberOfLines: null,
  textAlign: 'center',
  textStyle: null,
  ellipsizeMode: 'tail',
  width: null,
};

export default Typography;

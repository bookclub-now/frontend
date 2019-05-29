import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import Typography from '../typography/Typography';
import Spacing from '../spacing/Spacing';

import colors from '../../../constants/Colors';
import styles from './styles';

const Spinner = ({ message }) => (
  <View style={styles.loader}>
    <Typography
      variant="smallBodyPlus"
      color="search"
      textStyle={{ opacity: 0.7 }}
    >
      {message}
    </Typography>
    <Spacing horizontal size="semiThin" />
    <ActivityIndicator size="small" color={colors.global.primary} />
  </View>
);

Spinner.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Spinner;

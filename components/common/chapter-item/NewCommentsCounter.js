import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './styles';
import Typography from '../typography/Typography';

const CommentsCounter = ({ quantity }) =>
  quantity > 0 ? (
    <View style={styles.newComments}>
      <Typography variant="comments" color="white">
        {`${quantity} NEW!`}
      </Typography>
    </View>
  ) : null;

CommentsCounter.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default CommentsCounter;

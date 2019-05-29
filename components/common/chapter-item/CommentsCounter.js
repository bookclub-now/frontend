import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styles from './styles';
import Typography from '../typography/Typography';

const CommentsCounter = ({ quantity }) =>
  quantity ? (
    <View style={styles.comments}>
      <Typography variant="comments" color="dark">
        {quantity > 1 ? `${quantity} COMMENTS` : `${quantity} COMMENT`}
      </Typography>
    </View>
  ) : (
    <View style={styles.noComments}>
      <Typography variant="comments" color="dark">
        {`NOT STARTED`}
      </Typography>
    </View>
  );

CommentsCounter.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default CommentsCounter;

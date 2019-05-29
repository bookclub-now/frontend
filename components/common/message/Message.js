import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Localization } from 'expo';
import moment from 'moment-timezone';
import styles from './styles';
import Typography from '../typography/Typography';
import { getColorFromId } from '../../../constants/Colors';

class Message extends Component {
  static propTypes = {
    message: PropTypes.instanceOf(Object).isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { message } = this.props;
    return nextProps.message !== message;
  }

  render() {
    const { message } = this.props;
    const initials = message.user_display_name.split(' ');
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View
            style={{
              ...styles.profile,
              backgroundColor: getColorFromId(message.user_id),
            }}
          >
            <Typography variant="smallBody" color="white">
              {initials.length > 1
                ? `${initials[0][0]}${initials[1][0]}`
                : initials[0][0]}
            </Typography>
          </View>
        </View>
        <View style={styles.messageInfo}>
          <Typography variant="comments" color="secundary">
            {`${message.user_display_name.toUpperCase()}    ${moment
              .utc(message.inserted_at)
              .tz(Localization.timezone)
              .fromNow()
              .toUpperCase()}`}
          </Typography>
          <Typography textAlign="left" variant="messages" color="secundary">
            {message.text}
          </Typography>
        </View>
      </View>
    );
  }
}

export default Message;

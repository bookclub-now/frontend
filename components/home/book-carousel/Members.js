import React, { Component } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MembersItem from './MembersItem';
import Member from '../../../models/Member';
import MembersFooter from './MembersFooter';

class Members extends Component {
  state = {
    opacity: new Animated.Value(1),
  };

  shouldComponentUpdate(nextProps) {
    const { members } = this.props;
    return nextProps.members !== members;
  }

  render() {
    const { members, club } = this.props;
    const { opacity } = this.state;

    return (
      <Animated.FlatList
        horizontal
        style={{ ...styles.members, opacity }}
        keyExtractor={item => item.id.toString()}
        data={members.slice(0, 5)}
        renderItem={member => (
          <MembersItem member={Member.parseMember(member)} />
        )}
        ListFooterComponent={<MembersFooter club={club} />}
      />
    );
  }
}

Members.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  club: PropTypes.instanceOf(Object).isRequired,
};

export default Members;

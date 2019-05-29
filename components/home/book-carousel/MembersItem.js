import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Typography from '../../common/typography/Typography';
import { getColorFromId } from '../../../constants/Colors';
import Member from '../../../models/Member';

const MembersItem = ({ member }) =>
  member.photoUrl.length > 0 ? (
    <Image
      style={styles.membersThumbnail}
      source={{ uri: member.item.photoUrl }}
    />
  ) : (
    <View
      style={{
        ...styles.membersItem,
        backgroundColor: getColorFromId(member.id),
      }}
    >
      <Typography variant="smallBody" color="white">
        {member.firstName[0] + member.lastName[0]}
      </Typography>
    </View>
  );

MembersItem.propTypes = {
  member: PropTypes.instanceOf(Member).isRequired,
};

export default MembersItem;

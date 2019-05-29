import React from 'react';
import { TouchableOpacity } from 'react-native';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import Colors from '../../../constants/Colors';
import { shareClub } from '../../../actions/clubs';

const MembersFooter = ({ club, shareClubAction }) => (
  // TODO: Condition this with the user is not the owner of the club
  /*           <View
            style={{
              ...styles.membersItem,
              backgroundColor: Colors.global.gradientGray,
            }}
          >
            <Typography variant="smallBody" color="search">
              {`+${members.length - 5}`}
            </Typography>
          </View> */
  <TouchableOpacity
    style={{
      ...styles.membersItem,
      backgroundColor: Colors.global.gradientGray,
    }}
    onPress={() =>
      shareClubAction(club.id, club.shareCode, club.book.title, club.book.cover)
    }
  >
    <MaterialIcons name="add" color={Colors.text.secundary} size={24} />
  </TouchableOpacity>
);

MembersFooter.propTypes = {
  club: PropTypes.instanceOf(Object).isRequired,
  shareClubAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      shareClubAction: shareClub,
    },
    dispatch,
  );

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MembersFooter),
);

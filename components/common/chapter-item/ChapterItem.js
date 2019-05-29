import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity, View } from 'react-native';
import idx from 'idx';
import styles from './styles';
import Typography from '../typography/Typography';
import { navigateToThread } from '../../../actions/navigation';
import Colors from '../../../constants/Colors';
import Spacing from '../spacing/Spacing';
import CommentsCounter from './CommentsCounter';
import NewCommentsCounter from './NewCommentsCounter';

const ChapterItem = ({ chapter, club, clubs }) => {
  const comments = idx(clubs, _ => _.commentsCount[club.id]) || [];
  let lastSeenComments =
    idx(clubs, _ => _.lastSeen[club.id][chapter].commentsCount) || 0;

  let commentsCount = 0;
  let newComments = 0;

  const commentsCountArray = comments.filter(
    chptr => chptr.chapter === chapter,
  );

  if (commentsCountArray.length) {
    commentsCount = commentsCountArray[0].count;
    newComments = commentsCount - lastSeenComments;
  }

  return (
    <TouchableOpacity
      style={[styles.container, commentsCount && styles.chapterIndicator]}
      onPress={() => navigateToThread({ club, chapter, commentsCount })}
    >
      <View style={styles.chapterInfo}>
        <Typography variant="midBody" color="secundary">
          {`Chapter ${chapter}`}
        </Typography>
        <View style={styles.commentsContainer}>
          <CommentsCounter quantity={commentsCount} />
          <Spacing horizontal size="semiThin" />
          <NewCommentsCounter quantity={newComments} />
        </View>
      </View>
      <MaterialIcons
        name="arrow-forward"
        color={Colors.global.primary}
        size={28}
      />
    </TouchableOpacity>
  );
};

ChapterItem.propTypes = {
  chapter: PropTypes.number.isRequired,
  club: PropTypes.shape({}).isRequired,
  clubs: PropTypes.shape({
    commentsCount: PropTypes.shape({}),
  }).isRequired,
};

const mapStateToProps = ({ clubs }) => ({ clubs });

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChapterItem),
);

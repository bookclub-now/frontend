import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import NavBarHeader from '../components/common/nav-bar-header/NavBarHeader';
import ChapterItem from '../components/common/chapter-item/ChapterItem';
import { responsiveSize, normalize } from '../utils/dimensions';
import Spacing from '../components/common/spacing/Spacing';
import { leaveClub, getCommentsCount } from '../actions/clubs';
import Colors from '../constants/Colors';

class Chapters extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.instanceOf(Object).isRequired,
    leaveClubAction: PropTypes.func.isRequired,
    getCommentsCountAction: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.scrollView = React.createRef();
  }

  fetchCommentsCount = () => {
    const { getCommentsCountAction, navigation } = this.props;
    const club = navigation.getParam('club');
    getCommentsCountAction(club.id);
  };

  chapters = () => {
    const chapters = [];

    const { navigation } = this.props;
    const club = navigation.getParam('club');

    for (let chapter = 1; chapter <= club.book.chapters; chapter += 1) {
      chapters.push(
        <ChapterItem club={club} chapter={chapter} key={chapter} />,
      );
    }

    return chapters;
  };

  render() {
    const { navigation, leaveClubAction } = this.props;
    const club = navigation.getParam('club');

    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents onWillFocus={() => this.fetchCommentsCount()} />
        <LinearGradient
          colors={[Colors.global.white, Colors.global.gradientGray]}
          style={styles.backgroundGradient}
        >
          <NavBarHeader
            title={club.book.title}
            leftIcon="arrow-back"
            onPressIconLeft={() => navigation.goBack()}
            // TODO: Uncomment on V2
            // rightIcon="settings"
            // onPressIconRight={() => navigation.goBack()}
          />
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView
              ref={ref => {
                this.scrollView = ref;
              }}
              keyboardShouldPersistTaps="always"
              keyboardDismissMode="on-drag"
            >
              {this.chapters()}
              <Spacing size="thick" />
              <TouchableOpacity
                style={styles.flatButton}
                onPress={() => leaveClubAction(club)}
              >
                <Text style={styles.leaveText}>Leave Club</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      leaveClubAction: leaveClub,
      getCommentsCountAction: getCommentsCount,
    },
    dispatch,
  );

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Chapters),
);

const styles = StyleSheet.create({
  avoidKeyboard: {
    flex: 0.6,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.global.white,
  },
  backgroundGradient: {
    flex: 1,
  },
  wrapperButton: {
    flex: 0.5,
    backgroundColor: 'blue',
  },
  wrapperText: {
    height: responsiveSize(100),
    position: 'absolute',
    top: '35%',
    width: '65%',
    alignSelf: 'center',
  },
  shadow: {
    width: 320,
    height: 152,
    shadowColor: Colors.global.opacityBackground,
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    position: 'absolute',
    bottom: responsiveSize(110),
    alignSelf: 'center',
    alignItems: 'center',
  },
  leaveText: {
    width: '90%',
    color: Colors.text.red,
    fontSize: normalize(14),
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
  },
  flatButton: {
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

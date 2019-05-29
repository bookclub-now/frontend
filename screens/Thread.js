import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient, Amplitude } from 'expo';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import moment from 'moment';
import NavBarHeader from '../components/common/nav-bar-header/NavBarHeader';
import { responsiveSize } from '../utils/dimensions';
import Spacing from '../components/common/spacing/Spacing';
import Message from '../components/common/message/Message';
import ThreadService from '../services/Thread';

import Colors from '../constants/Colors';
import Typography from '../components/common/typography/Typography';
import { addLastSeen } from '../actions/clubs';

class Thread extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({}).isRequired,
    account: PropTypes.shape({}).isRequired,
    addLastSeenAction: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { navigation, account } = this.props;
    const { id } = navigation.getParam('club');
    const chapter = navigation.getParam('chapter');

    this.handleSend = this.handleSend.bind(this);
    this.receiveChatMessage = this.receiveChatMessage.bind(this);
    this.thread = ThreadService(
      id,
      chapter,
      account.token,
      this.receiveChatMessage,
    );
    this.state = { messages: [], draft: '' };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.thread.getUnseenMessages();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.thread.close();
  }

  receiveChatMessage = message => {
    const { messages } = this.state;
    this.setState({ messages: [...messages, message] }, this.updateLastSeen);
  };

  _keyboardDidShow = () => {
    this.flatList.scrollToEnd({ animated: true });
  };

  updateLastSeen = () => {
    const { messages } = this.state;
    const { navigation, addLastSeenAction } = this.props;
    const { id } = navigation.getParam('club');
    const chapter = navigation.getParam('chapter');

    addLastSeenAction(id, chapter, messages.length, moment().format());
  };

  handleSend = () => {
    const { draft } = this.state;
    this.thread.send(draft);
    this.setState({ draft: '' });
    Amplitude.logEvent('bookclub.joined');
  };

  render() {
    const { messages, draft } = this.state;
    const { navigation } = this.props;
    const chapter = navigation.getParam('chapter');

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <LinearGradient
            colors={[Colors.global.white, Colors.global.gradientGray]}
            style={styles.backgroundGradient}
          >
            <NavBarHeader
              title={`Chapter ${chapter}`}
              leftIcon="arrow-back"
              onPressIconLeft={() => navigation.goBack()}
              // TODO: This is for V2
              // rightIcon="settings"
              // onPressIconRight={() => navigation.goBack()}
            />
            <FlatList
              ref={ref => {
                this.flatList = ref;
              }}
              keyboardDismissMode="on-drag"
              snapToEnd
              data={messages}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <Message message={item} />}
              onContentSizeChange={() => {
                this.flatList.scrollToEnd({ animated: true });
              }}
            />
            <Spacing size="thin" />
            <Spacing color={Colors.global.tabIconDefault} size="xThin" />
            <Spacing size="xThin" />
            <View style={styles.draft}>
              <ScrollView style={styles.input}>
                <AutoGrowingTextInput
                  value={draft}
                  onChangeText={text => this.setState({ draft: text })}
                  onSubmitEditing={() => {
                    this.flatList.scrollToEnd({ animated: true });
                  }}
                  placeholder="Add to the conversation"
                  blurOnSubmit={false}
                  multiline
                />
              </ScrollView>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={this.handleSend}
              >
                <Typography variant="smallBodyBold" color="white">
                  Send
                </Typography>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ account }) => ({
  account,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addLastSeenAction: addLastSeen,
    },
    dispatch,
  );

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Thread),
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
  draft: {
    minHeight: responsiveSize(33),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginBottom: responsiveSize(7),
  },
  sendButton: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: Colors.global.primary,
    borderRadius: 4,
    width: responsiveSize(56),
    height: 30,
    flex: 0.15,
  },
  input: {
    flex: 0.85,
  },
});

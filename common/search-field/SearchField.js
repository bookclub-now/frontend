import React from 'react';
import PropTypes from 'prop-types';
import { Animated, View, TextInput, TouchableOpacity } from 'react-native';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import styles from './styles';
import Colors from '../../../constants/Colors';
import { clearSearch } from '../../../actions/books';

const CloseButton = Animated.createAnimatedComponent(TouchableOpacity);

class SearchField extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    shadowAnimAndroid: new Animated.Value(1),
    shadowAnim: new Animated.Value(0.02),
    closeButtonAnim: new Animated.Value(0),
    hasFocus: false,
  };

  static propTypes = {
    onKeyPress: PropTypes.func,
    onChangeText: PropTypes.func,
    clearSearchAction: PropTypes.func,
    value: PropTypes.string,
  };

  static defaultProps = {
    clearSearchAction: () => {},
    onKeyPress: () => {},
    onChangeText: () => {},
    value: '',
  };

  componentDidUpdate() {
    const {
      shadowAnim,
      shadowAnimAndroid,
      hasFocus,
      closeButtonAnim,
    } = this.state;
    const { value } = this.props;

    if (hasFocus) {
      Animated.timing(shadowAnim, {
        toValue: 0.2,
        duration: 300,
      }).start();
      Animated.timing(shadowAnimAndroid, {
        toValue: 4,
        duration: 300,
      }).start();
    } else {
      Animated.timing(shadowAnim, {
        toValue: 0.02,
        duration: 300,
      }).start();
      Animated.timing(shadowAnimAndroid, {
        toValue: 1,
        duration: 300,
      }).start();
    }

    if (value) {
      Animated.timing(closeButtonAnim, {
        toValue: 1,
        duration: 100,
      }).start();
    }
  }

  _handleOnchangeText = text => {
    const { onChangeText } = this.props;

    onChangeText(text);

    if (text === '') this.setState({ closeButtonAnim: new Animated.Value(0) });
  };

  render() {
    const { value, onKeyPress, clearSearchAction } = this.props;
    const {
      hasFocus,
      shadowAnim,
      shadowAnimAndroid,
      closeButtonAnim,
    } = this.state;
    return (
      <Animated.View
        style={
          hasFocus === false
            ? {
                ...styles.textFieldContainerNotFocused,
                shadowOpacity: shadowAnim,
                elevation: shadowAnimAndroid,
              }
            : {
                ...styles.textFieldContainerFocused,
                shadowOpacity: shadowAnim,
                elevation: shadowAnimAndroid,
              }
        }
      >
        <View style={styles.wrapperIcon}>
          <MaterialIcons
            name="search"
            color={Colors.global.inactive}
            size={24}
          />
        </View>
        <View style={styles.wrapperInputText}>
          <TextInput
            onChangeText={this._handleOnchangeText}
            selectionColor={Colors.text.secundary}
            style={styles.textStyle}
            onFocus={() => {
              this.setState({ hasFocus: true });
            }}
            onBlur={() => {
              this.setState({ hasFocus: false });
            }}
            onKeyPress={onKeyPress}
            placeholder="Search by title or author"
            placeholderTextColor={Colors.global.inactive}
            value={value}
          />
        </View>
        {value.length > 0 ? (
          <CloseButton
            style={{ ...styles.wrapperIcon, opacity: closeButtonAnim }}
            onPress={() => {
              this._handleOnchangeText('');
              clearSearchAction();
            }}
          >
            <AntDesign
              name="closecircle"
              color={Colors.text.secundary}
              size={20}
            />
          </CloseButton>
        ) : (
          <View style={styles.wrapperIcon} />
        )}
      </Animated.View>
    );
  }
}

const mapStateToProps = ({ books }) => ({
  searchSelectedBook: books.searchSelectedBook,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearSearchAction: clearSearch,
    },
    dispatch,
  );

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchField),
);

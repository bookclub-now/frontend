import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import { selectSearchBook, clearSearch } from '../../../actions/books';
import Typography from '../typography/Typography';
import AnimatedImage from '../animated-image/AnimatedImage';
import Book from '../../../models/Book';

class BookResultItem extends React.Component {
  state = { fadeAnim: new Animated.Value(0) };

  static propTypes = {
    book: PropTypes.instanceOf(Object).isRequired,
    clearSearchAction: PropTypes.func,
    onResultSelected: PropTypes.func,
    selectSearchBookAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    clearSearchAction: () => {},
    onResultSelected: () => {},
  };

  componentDidMount() {
    const { fadeAnim } = this.state;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  _handleSelection = book => {
    const { selectSearchBookAction, onResultSelected } = this.props;

    selectSearchBookAction(book);
    onResultSelected();
    Keyboard.dismiss();
  };

  render() {
    const { fadeAnim } = this.state;
    const { book } = this.props;
    const { id, title, authors, imageLinks } = book;
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          const { clearSearchAction } = this.props;
          this._handleSelection(
            new Book(id, title, authors, imageLinks.thumbnail),
          );
          clearSearchAction();
        }}
        underlayColor="transparent"
      >
        <Animated.View
          style={{
            ...styles.result,
            opacity: fadeAnim,
          }}
        >
          <AnimatedImage
            style={styles.bookCover}
            source={
              imageLinks.smallThumbnail
                ? {
                    uri: imageLinks.smallThumbnail,
                  }
                : {}
            }
          />
          <View style={styles.textView}>
            <Typography
              variant="body"
              color="search"
              ellipsizeMode="tail"
              numberOfLines={1}
              textStyle={styles.title}
            >
              {title}
            </Typography>
            <Typography
              variant="smallBodyPlus"
              color="search"
              ellipsizeMode="tail"
              numberOfLines={1}
              textStyle={styles.authors}
            >
              {Book.getAuthors(authors)}
            </Typography>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = ({ books }) => ({
  searchSelectedBook: books,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectSearchBookAction: selectSearchBook,
      clearSearchAction: clearSearch,
    },
    dispatch,
  );

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookResultItem),
);

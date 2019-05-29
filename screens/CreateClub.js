/* eslint-disable react/prop-types */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import NavBarHeader from '../components/common/nav-bar-header/NavBarHeader';
import { responsiveSize } from '../utils/dimensions';
import Spacing from '../components/common/spacing/Spacing';

import Colors from '../constants/Colors';
import SearchView from '../components/create-club/search-view/SearchView';
import Typography from '../components/common/typography/Typography';
import InputTextField from '../components/common/input-text-field/InputTextField';
import Button from '../components/common/button/Button';
import { clearSelectedSearchBook, clearSearch } from '../actions/books';
import { createClub } from '../actions/clubs';
import Book from '../models/Book';

class CreateClub extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.scrollView = React.createRef();

    const { clearSelectedSearchBookAction, clearSearchAction } = props;
    clearSelectedSearchBookAction();
    clearSearchAction();
  }

  state = {
    book: new Book(),
    showForm: true,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.searchSelectedBook.id !== state.book.id) {
      return {
        book: props.searchSelectedBook,
        showForm: true,
      };
    }
    return null;
  }

  componentDidUpdate() {
    const { book, showForm } = this.state;

    const formComplete = book.title && book.authors && book.chapters;

    if (formComplete && showForm)
      this.scrollView.scrollToEnd({ animated: true });
  }

  _onSearchTextChange = text => {
    if (text) {
      this.setState({
        showForm: false,
      });
    } else {
      this.setState({
        showForm: true,
      });
    }
  };

  _onCreateClubPress = () => {
    const { navigation, createClubAction } = this.props;
    const { book } = this.state;
    createClubAction(book);
    navigation.navigate('Home');
  };

  _onChangeTitle = title => {
    const { book } = this.state;
    this.setState({ book: { ...book, title } });
  };

  _onChangeAuthor = authors => {
    const { book } = this.state;
    this.setState({ book: { ...book, authors: Book.getAuthors(authors) } });
  };

  _onChangeChapters = chapters => {
    const { book } = this.state;
    this.setState({ book: { ...book, chapters } });
  };

  _onClose = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  render() {
    const { book, showForm } = this.state;
    const formComplete = book.title && book.authors && book.chapters;

    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[Colors.global.white, Colors.global.gradientGray]}
          style={styles.backgroundGradient}
        >
          <NavBarHeader
            rightIcon="close"
            title="Create a new Club"
            onPressIconRight={this._onClose}
          />
          <Spacing size="thick" />
          <SearchView searchText={this._onSearchTextChange} />
          {showForm && (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
              <ScrollView
                ref={ref => {
                  this.scrollView = ref;
                }}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
              >
                {/* <Spacing size="semiThin" /> */}
                <Typography variant="smallBody" color="search">
                  OR enter book details manually
                </Typography>
                <Spacing size="default" />
                <InputTextField
                  iconName="title"
                  placeHolder="Book Title"
                  onChangeText={this._onChangeTitle}
                  value={book.title}
                  image={book.cover}
                />
                <Spacing size="default" />
                <InputTextField
                  iconName="person"
                  placeHolder="Author"
                  onChangeText={this._onChangeAuthor}
                  value={book.authors}
                />
                <Spacing size="default" />
                <InputTextField
                  iconName="format-list-numbered"
                  placeHolder="# of chapters"
                  onChangeText={this._onChangeChapters}
                  keyboardType="number-pad"
                  value={book.chapters}
                />
                <Spacing size="thick" />
                <Button
                  style={{
                    marginHorizontal: '5%',
                    display: formComplete ? 'flex' : 'none',
                  }}
                  textColor={Colors.text.white}
                  buttonColor={Colors.global.primary}
                  text="Create Club"
                  onPress={this._onCreateClubPress}
                />
                <Spacing size="thick" />
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ books }) => ({
  searchSelectedBook: books.searchSelectedBook,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      clearSelectedSearchBookAction: clearSelectedSearchBook,
      clearSearchAction: clearSearch,
      createClubAction: createClub,
    },
    dispatch,
  );

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CreateClub),
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
});

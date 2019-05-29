/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import BookResultItem from '../book-result-item/BookResultItem';

class BookSearchResult extends React.Component {
  static propTypes = {
    books: PropTypes.instanceOf(Array).isRequired,
    onResultSelected: PropTypes.func.isRequired,
  };

  render() {
    const { books, onResultSelected } = this.props;
    return books ? (
      <FlatList
        {...this.props}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BookResultItem book={item} onResultSelected={onResultSelected} />
        )}
      />
    ) : null;
  }
}

const mapStateToProps = ({ books }) => ({
  books: books.searchResults,
});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookSearchResult),
);

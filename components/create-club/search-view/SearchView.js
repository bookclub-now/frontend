import React from 'react';
import { View } from 'react-native';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles';
import SearchField from '../../common/search-field/SearchField';
import BookSearchResult from '../../common/book-search-result/BookSearchResult';
import Spinner from '../../common/spinner/Spinner';
import Typography from '../../common/typography/Typography';
import { searchBook, fetchMoreResults } from '../../../actions/books';

class SearchView extends React.Component {
  state = {
    index: 0,
    query: '',
  };

  static propTypes = {
    searchText: PropTypes.func,
    searchBookAction: PropTypes.func,
    fetchMoreResultsAction: PropTypes.func,
    searching: PropTypes.bool,
    fetchingMore: PropTypes.bool,
    noResults: PropTypes.bool,
  };

  static defaultProps = {
    searchText: () => {},
    searchBookAction: () => {},
    fetchMoreResultsAction: () => {},
    searching: false,
    fetchingMore: false,
    noResults: false,
  };

  _handleTextchange = query => {
    const { searchText } = this.props;
    searchText(query);
    this._searchBooks(query);
  };

  _searchBooks = query => {
    const { searchBookAction } = this.props;

    this.setState({ query, index: 0 });

    searchBookAction({ query, index: 0 });
  };

  _fetchMoreResults = () => {
    const { query, index } = this.state;
    const { fetchMoreResultsAction } = this.props;

    this.setState({ index: index + 20 });

    fetchMoreResultsAction({ query, index: index + 20 });
  };

  render() {
    const { query } = this.state;
    const { searching, fetchingMore, noResults } = this.props;
    return (
      <View style={query.length && { flex: 1 }}>
        <SearchField onChangeText={this._handleTextchange} value={query} />
        {searching ? (
          <Spinner message="Looking for related books" />
        ) : (
          <BookSearchResult
            style={styles.results}
            onEndReachedThreshold={0.9}
            onEndReached={this._fetchMoreResults}
            onResultSelected={() => this.setState({ query: '', index: 0 })}
            ListEmptyComponent={() =>
              noResults && (
                <Typography
                  variant="smallBodyPlus"
                  color="search"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  No results
                </Typography>
              )
            }
            ListFooterComponent={() =>
              fetchingMore && <Spinner message="Fetching more results" />
            }
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ books }) => ({
  ...books,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchBookAction: searchBook,
      fetchMoreResultsAction: fetchMoreResults,
    },
    dispatch,
  );

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchView),
);

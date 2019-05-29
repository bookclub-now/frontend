import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Typography from '../typography/Typography';
import { getColorFromId } from '../../../constants/Colors';
import { responsiveSize } from '../../../utils/dimensions';

class BookCover extends Component {
  static propTypes = {
    book: PropTypes.instanceOf(Object).isRequired,
    style: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    style: {},
  };

  shouldComponentUpdate(nextProps) {
    const { book } = this.props;
    return nextProps.book !== book;
  }

  render() {
    const { book, style } = this.props;
    return (
      <View
        style={{
          ...style,
          backgroundColor: getColorFromId(book.id.length),
        }}
      >
        <Typography
          textStyle={{ paddingHorizontal: responsiveSize(10) }}
          variant="coverTitle"
          ellipsizeMode="tail"
          numberOfLines={2}
          color="white"
        >
          {book.title}
        </Typography>
        <Typography
          textStyle={{ opacity: 0.8, paddingHorizontal: responsiveSize(10) }}
          variant="coverAuthors"
          ellipsizeMode="tail"
          numberOfLines={2}
          color="white"
        >
          {book.authors}
        </Typography>
      </View>
    );
  }
}

export default BookCover;

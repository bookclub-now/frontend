import React, { Component } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import AnimatedImage from '../../common/animated-image/AnimatedImage';
import styles from './styles';
import BookCover from '../../common/book-cover/BookCover';
import Members from './Members';

import { navigateToChapters } from '../../../actions/navigation';
import { responsiveSize } from '../../../utils/dimensions';

class CarouselItem extends Component {
  state = {
    shadowOpacity: new Animated.Value(1),
  };

  componentDidUpdate() {
    const { item, currentIndex } = this.props;
    const { shadowOpacity } = this.state;

    if (item.index === currentIndex) {
      Animated.timing(shadowOpacity, {
        toValue: 15,
        duration: 200,
      }).start();
    } else {
      Animated.timing(shadowOpacity, {
        toValue: 0,
        duration: 200,
      }).start();
    }
  }

  render() {
    const { item } = this.props;
    const { shadowOpacity } = this.state;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigateToChapters(item.item)}
        style={{
          padding: 20,
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            ...styles.item,
            backgroundColor: 'white',
            elevation: shadowOpacity,
          }}
        >
          {item.item.book.cover ? (
            <AnimatedImage
              resizeMode="stretch"
              style={{ ...styles.cover, width: responsiveSize(290) }}
              source={{ uri: item.item.book.cover }}
            />
          ) : (
            <BookCover
              style={{ ...styles.cover, width: responsiveSize(290) }}
              book={item.item.book}
            />
          )}
          <Members members={item.item.members} club={item.item} />
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

CarouselItem.propTypes = {
  item: PropTypes.instanceOf(Object).isRequired,
  currentIndex: PropTypes.number.isRequired,
};

export default CarouselItem;

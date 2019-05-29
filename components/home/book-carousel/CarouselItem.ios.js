import React, { Component } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import AnimatedImage from '../../common/animated-image/AnimatedImage';
import styles from './styles';
import BookCover from '../../common/book-cover/BookCover';
import Members from './Members';

import { navigateToChapters } from '../../../actions/navigation';

class CarouselItem extends Component {
  state = {
    shadowOpacity: new Animated.Value(1),
  };

  componentDidUpdate() {
    const { item, currentIndex } = this.props;
    const { shadowOpacity } = this.state;

    if (item.index === currentIndex) {
      Animated.timing(shadowOpacity, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(shadowOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
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
      >
        <Animated.View
          style={{
            ...styles.item,
            shadowOpacity,
          }}
        >
          {item.item.book.cover ? (
            <AnimatedImage
              resizeMode="stretch"
              style={styles.cover}
              source={{ uri: item.item.book.cover }}
            />
          ) : (
            <BookCover style={styles.cover} book={item.item.book} />
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

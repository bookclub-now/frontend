import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import CarouselItem from './CarouselItem';

const { width } = Dimensions.get('window');

class BookCarousel extends Component {
  static propTypes = {
    clubs: PropTypes.instanceOf(Array).isRequired,
  };

  state = {
    currentIndex: 0,
  };

  render() {
    const { clubs } = this.props;
    const { currentIndex } = this.state;

    return (
      <Carousel
        data={clubs}
        renderItem={item => (
          <CarouselItem currentIndex={currentIndex} item={item} />
        )}
        contentContainerCustomStyle={styles.carousel}
        sliderWidth={width}
        itemWidth={
          Platform.OS === 'ios' ? styles.item.width : styles.item.width + 20
        }
        hasParallaxImages
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.7}
        onSnapToItem={index => this.setState({ currentIndex: index })}
      />
    );
  }
}

const mapStateToProps = ({ clubs }) => ({
  clubs: clubs.clubs,
});

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookCarousel),
);

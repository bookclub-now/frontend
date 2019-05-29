import React from 'react';
import { Animated } from 'react-native';

class AnimatedImage extends React.Component {
  state = { fadeAnim: new Animated.Value(0) };

  _onLoadEnd = () => {
    const { fadeAnim } = this.state;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { fadeAnim } = this.state;
    const { props } = this;
    return (
      <Animated.Image
        {...props}
        onLoadEnd={this._onLoadEnd}
        style={{
          ...props.style,
          opacity: fadeAnim,
        }}
      />
    );
  }
}

export default AnimatedImage;

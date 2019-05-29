import { Dimensions } from 'react-native';

import { responsiveSize } from '../utils/dimensions';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  spacing: {
    xThin: responsiveSize(2),
    thin: responsiveSize(4),
    semiThin: responsiveSize(8),
    default: responsiveSize(16),
    thick: responsiveSize(24),
    extraThick: responsiveSize(32),
    large: responsiveSize(64),
    extraLarge: responsiveSize(128),
  },
};

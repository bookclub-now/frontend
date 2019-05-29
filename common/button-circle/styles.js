import { responsiveSize } from '../../../utils/dimensions';
import Colors from '../../../constants/Colors';

export default {
  circle: {
    width: responsiveSize(48),
    height: responsiveSize(48),
    backgroundColor: Colors.global.white,
    shadowColor: Colors.global.opacityBackground,
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 8,
    borderRadius: responsiveSize(48) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

import { responsiveSize } from '../../../utils/dimensions';
import Colors from '../../../constants/Colors';

export default {
  container: {
    alignItems: 'center',
    justifyconent: 'flex-end',
    top: responsiveSize(75),
  },
  wrapperText: {
    height: responsiveSize(100),
    width: '65%',
  },
  shadow: {
    width: 320,
    height: 152,
    marginTop: responsiveSize(55),
    shadowColor: Colors.global.opacityBackground,
    shadowOffset: {
      width: 1,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    alignItems: 'center',
  },
};

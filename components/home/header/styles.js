import { responsiveSize } from '../../../utils/dimensions';

export default {
  header: {
    height: responsiveSize(85),
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    right: 0,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  logo: {
    width: responsiveSize(119),
    height: responsiveSize(26),
  },
};

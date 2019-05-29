import Colors from '../../../constants/Colors';
import { responsiveSize } from '../../../utils/dimensions';

export default {
  result: {
    height: responsiveSize(60),
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: responsiveSize(16),
  },
  bookCover: {
    width: responsiveSize(37),
    height: responsiveSize(56),
    shadowColor: Colors.global.opacityBackground,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 22,
    borderWidth: 0,
  },
  title: {
    textAlign: 'left',
  },
  authors: {
    opacity: 0.8,
    textAlign: 'left',
  },
  textView: {
    alignSelf: 'center',
    width: '90%',
    paddingLeft: responsiveSize(18),
  },
};

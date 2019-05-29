import Colors from '../../../constants/Colors';
import { responsiveSize, normalize } from '../../../utils/dimensions';

export default {
  textFieldContainer: {
    alignSelf: 'center',
    width: '90%',
  },
  textStyle: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    color: Colors.text.search,
    fontSize: normalize(14),
    fontFamily: 'Raleway-Regular',
  },
  wrapperInputText: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveSize(60),
    borderRadius: responsiveSize(8),
    backgroundColor: Colors.global.gradientGray,
  },
  label: {
    fontFamily: 'Raleway-Regular',
    fontSize: normalize(14),
  },
};

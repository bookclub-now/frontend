import Colors from '../../../constants/Colors';
import { responsiveSize, normalize } from '../../../utils/dimensions';

export default {
  textFieldContainerNotFocused: {
    height: responsiveSize(60),
    alignSelf: 'center',
    width: '90%',
    borderRadius: responsiveSize(8),
    backgroundColor: Colors.global.gradientGray,
    shadowColor: Colors.global.opacityBackground,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowRadius: 4,
    flexDirection: 'row',
  },
  textStyle: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    color: Colors.text.search,
    fontSize: normalize(14),
    fontFamily: 'Raleway-Light',
  },
  textFieldContainerFocused: {
    height: responsiveSize(60),
    alignSelf: 'center',
    width: '90%',
    borderRadius: responsiveSize(8),
    backgroundColor: Colors.global.gradientGray,
    shadowColor: Colors.global.opacityBackground,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowRadius: 4,
    flexDirection: 'row',
  },
  wrapperIcon: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperInputText: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

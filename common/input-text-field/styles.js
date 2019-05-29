import Colors from '../../../constants/Colors';
import { responsiveSize, normalize } from '../../../utils/dimensions';

export default {
  textFieldContainer: {
    height: responsiveSize(60),
    alignSelf: 'center',
    width: '90%',
    borderRadius: responsiveSize(8),
    backgroundColor: 'white',
    shadowColor: Colors.global.opacityBackground,
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    flexDirection: 'row',
    borderWidth: 0,
    elevation: 5,
  },
  focused: {
    borderColor: Colors.global.primary,
    borderWidth: 1,
  },
  errors: {
    borderColor: Colors.global.errorBackground,
    borderWidth: 1,
  },
  errorMessage: {
    color: Colors.global.errorBackground,
    marginHorizontal: '5%',
  },
  textStyle: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    color: Colors.text.secundary,
    fontSize: normalize(14),
    fontFamily: 'Raleway-Light',
  },
  wrapperIcon: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperImage: {
    justifyContent: 'center',
    borderTopRightRadius: responsiveSize(8),
    borderBottomRightRadius: responsiveSize(8),
    overflow: 'hidden',
  },
  wrapperImageFocused: {
    justifyContent: 'center',
    borderTopRightRadius: responsiveSize(7),
    borderBottomRightRadius: responsiveSize(7),
    overflow: 'hidden',
  },
  wrapperInputText: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookCover: {
    width: responsiveSize(39),
    height: responsiveSize(60),
  },
};

import { StyleSheet } from 'react-native';
import { responsiveSize } from '../../../utils/dimensions';
import Colors from '../../../constants/Colors';

export default StyleSheet.create({
  item: {
    width: responsiveSize(290),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.global.opacityBackground,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
    elevation: 40,
  },
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    width: responsiveSize(265),
    height: responsiveSize(412),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 7,
    borderColor: Colors.global.white,
  },
  logo: {
    width: responsiveSize(119),
    height: responsiveSize(26),
    top: responsiveSize(20),
  },
  members: {
    height: responsiveSize(45),
    width: responsiveSize(265),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 4,
    paddingRight: 4,
  },
  membersItem: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: responsiveSize(2),
  },
  membersThumbnail: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

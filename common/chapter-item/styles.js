import { StyleSheet } from 'react-native';
import { responsiveSize } from '../../../utils/dimensions';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    height: responsiveSize(80),
    paddingHorizontal: '5%',
    marginHorizontal: '3%',
    marginTop: responsiveSize(10),
    backgroundColor: Colors.global.white,
    shadowColor: Colors.global.opacityBackground,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderRadius: responsiveSize(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  chapterIndicator: {
    borderLeftColor: Colors.global.primary,
    borderLeftWidth: 8,
  },
  chapterInfo: {
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  commentsContainer: {
    flexDirection: 'row',
  },
  newComments: {
    padding: 3,
    backgroundColor: Colors.global.primary,
    borderRadius: 10,
  },
  comments: {
    padding: 3,
    paddingHorizontal: 5,
    backgroundColor: Colors.global.commentsBackgroubd,
    borderRadius: 10,
  },
  noComments: {
    padding: 3,
  },
});

export default styles;

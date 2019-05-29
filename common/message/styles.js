import { StyleSheet } from 'react-native';
import { responsiveSize } from '../../../utils/dimensions';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    marginHorizontal: '3%',
    marginTop: responsiveSize(10),
    borderRadius: responsiveSize(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  messageInfo: {
    height: '100%',
    paddingHorizontal: '5%',
    flex: 0.9,
    alignItems: 'flex-start',
  },
  profile: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  profileContainer: {
    alignSelf: 'flex-start',
    flex: 0.1,
  },
});

export default styles;

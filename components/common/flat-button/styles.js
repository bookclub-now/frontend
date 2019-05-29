import { StyleSheet } from 'react-native';
import { normalize } from '../../../utils/dimensions';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  flatButton: {
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: '90%',
    color: Colors.text.red,
    fontSize: normalize(14),
    fontFamily: 'Raleway-Regular',
  },
});

export default styles;

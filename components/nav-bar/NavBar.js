import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import ButtonIcon from '../common/button-icon/ButtonIcon';
import ButtonCircle from '../common/button-circle/ButtonCircle';
import {
  navigateToCreateClub,
  navigateToProfile,
} from '../../actions/navigation';

const NavBar = () => (
  <View style={styles.navBar}>
    <View style={styles.profile}>
      <ButtonIcon
        name="person"
        color="tabIconDefault"
        size={28}
        style={{ paddingHorizontal: 5 }}
        onPress={() => navigateToProfile()}
      />
    </View>
    <View style={styles.action}>
      <ButtonCircle
        name="add"
        color="primary"
        size={36}
        style={{ paddingHorizontal: 3 }}
        onPress={() => navigateToCreateClub()}
      />
    </View>
    <View style={styles.alert}>
      {/* Remove in V2 */}
      {/* <ButtonIcon
        name="notifications"
        color="tabIconDefault"
        size={28}
        style={{ paddingHorizontal: 5 }}
      /> */}
    </View>
  </View>
);

export default NavBar;

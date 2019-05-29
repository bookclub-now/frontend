import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Spacing from '../../common/spacing/Spacing';
import PopUpMessage from '../pop-up-message/PopUpMessage';
import Typography from '../../common/typography/Typography';

const TEXT1 = 'You aren’t in any clubs yet… but that’s ok!';
const TEXT2 = 'Clubs you create or get invited to will show up here';

const InitialMessage = () => (
  <View style={styles.container}>
    <View style={styles.wrapperText}>
      <Typography variant="midBody" color="primary" numberOfLines={2}>
        {TEXT1}
      </Typography>
      <Spacing size="default" />
      <Typography variant="body" color="secundary">
        {TEXT2}
      </Typography>
    </View>
    <View style={styles.shadow}>
      <PopUpMessage
        title="Want to create a club?"
        subtitle="Just tap the"
        subtitle2=" + "
        subtitle3="button"
      />
    </View>
  </View>
);

export default InitialMessage;

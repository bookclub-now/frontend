import React from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Typography from '../../common/typography/Typography';
import Spacing from '../../common/spacing/Spacing';

const imagePopUp = require('../../../assets/images/common/popup.png');

const PopUpMessage = ({ title, subtitle, subtitle2, subtitle3 }) => (
  <ImageBackground source={imagePopUp} style={styles.popup}>
    <Spacing size="thick" />
    <Typography variant="midBody" color="secundary">
      {title}
    </Typography>
    <Spacing size="default" />
    <Typography variant="body" color="secundary">
      {subtitle}
      <Typography variant="largeBodyRegular" color="primary">
        {subtitle2}
      </Typography>
      {subtitle3}
    </Typography>
  </ImageBackground>
);

PopUpMessage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  subtitle2: PropTypes.string,
  subtitle3: PropTypes.string,
};

PopUpMessage.defaultProps = {
  subtitle2: '',
  subtitle3: '',
};

export default PopUpMessage;

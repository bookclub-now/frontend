import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text } from 'react-native';
import styles from './styles';
import Colors from '../../../constants/Colors';

const FlatInput = ({ label, ...props }) => (
  <View style={styles.textFieldContainer}>
    {label.length > 0 && <Text style={styles.label}>{label}</Text>}
    <View style={styles.wrapperInputText}>
      <TextInput
        {...props}
        selectionColor={Colors.text.secundary}
        style={{
          ...styles.textStyle,
          color: Colors.text.search,
        }}
      />
    </View>
  </View>
);

FlatInput.propTypes = {
  label: PropTypes.string,
};

FlatInput.defaultProps = {
  label: '',
};

export default FlatInput;

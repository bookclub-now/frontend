import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import Colors from '../../../constants/Colors';
import AnimatedImage from '../animated-image/AnimatedImage';
import { capitalize } from '../../../helpers/strings';

class InputTextField extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    hasFocus: false,
  };

  render() {
    const { hasFocus } = this.state;
    const {
      iconName,
      placeHolder,
      onChangeText,
      keyboardType,
      image,
      value,
      secureTextEntry,
      editable,
      errors,
      errorMessage,
      autoCapitalize,
      inputProps,
    } = this.props;
    const iconColor =
      hasFocus === false ? Colors.global.tabIconDefault : Colors.global.primary;
    return (
      <View>
        <View
          style={[
            styles.textFieldContainer,
            hasFocus ? styles.focused : {},
            errors ? styles.errors : {},
          ]}
        >
          {iconName.length > 0 && (
            <View style={styles.wrapperIcon}>
              <MaterialIcons
                name={iconName}
                color={errors ? Colors.global.errorBackground : iconColor}
                size={24}
              />
            </View>
          )}
          <View style={styles.wrapperInputText}>
            <TextInput
              value={value}
              autoCapitalize={autoCapitalize}
              onChangeText={text => onChangeText(text)}
              selectionColor={Colors.text.secundary}
              style={{
                ...styles.textStyle,
                color: Colors.text.search,
              }}
              onFocus={() => {
                this.setState({ hasFocus: true });
                inputProps.onFocusCallback && inputProps.onFocusCallback();
              }}
              onBlur={() => {
                this.setState({ hasFocus: false });
              }}
              placeholder={placeHolder}
              placeholderTextColor={Colors.global.inactive}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              editable={editable}
              ref={ref => inputProps.setRef(ref)}
              {...inputProps}
            />
          </View>
          {image.length > 0 && (
            <View
              style={
                hasFocus === false
                  ? styles.wrapperImage
                  : styles.wrapperImageFocused
              }
            >
              <AnimatedImage
                resizeMode="cover"
                style={styles.bookCover}
                source={{ uri: image }}
              />
            </View>
          )}
        </View>
        {errorMessage[0].length > 0 && (
          <Text style={styles.errorMessage}>{capitalize(errorMessage[0])}</Text>
        )}
      </View>
    );
  }
}

InputTextField.propTypes = {
  iconName: PropTypes.string,
  placeHolder: PropTypes.string,
  onChangeText: PropTypes.func,
  image: PropTypes.string,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  editable: PropTypes.bool,
  errors: PropTypes.bool,
  errorMessage: PropTypes.instanceOf(Array),
  inputProps: PropTypes.shape({
    setRef: PropTypes.func,
    onFocusCallback: PropTypes.func,
  }),
  autoCapitalize: PropTypes.string,
};

InputTextField.defaultProps = {
  keyboardType: 'default',
  iconName: '',
  placeHolder: '',
  onChangeText: () => {},
  image: '',
  value: '',
  secureTextEntry: false,
  editable: true,
  errors: false,
  errorMessage: [''],
  autoCapitalize: 'sentences',
  inputProps: { setRef: () => '', onFocusCallback: () => {} },
};

export default InputTextField;

/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import InputTextField from '../common/input-text-field/InputTextField';

export default class Input extends Component {
  state = {};

  render() {
    const {
      input,
      label,
      meta: { touched, error },
      ...props
    } = this.props;

    return (
      <InputTextField
        placeHolder={label}
        errors={touched && !!error}
        errorMessage={touched && error ? [error] : ['']}
        onChangeText={input.onChange}
        value={input.value}
        iconName={props.iconName}
        inputProps={{ ...props }}
      />
    );
  }
}

/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Icon } from 'expo';
import PropTypes from 'prop-types';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    const { name, focused } = this.props;
    return (
      <Icon.Ionicons
        name={name}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

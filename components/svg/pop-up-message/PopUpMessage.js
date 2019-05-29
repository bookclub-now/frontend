import React from 'react';
import { Svg } from 'expo';

const { Path } = Svg;

const PopUpMessage = ({ width, height, props }) => (
  <Svg width={width} height={height} {...props}>
    <Path
      d="M179 134l-18.5 18-18.5-18H0V0h320v134H179z"
      fill="#FFF"
      fillRule="evenodd"
    />
  </Svg>
);

export default PopUpMessage;

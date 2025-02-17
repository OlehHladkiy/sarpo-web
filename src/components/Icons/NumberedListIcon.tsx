/* eslint-disable max-len */
import React from 'react';

interface NumberedListIconProps {
  width: number | string;
  height: number | string;
}

const NumberedListIcon: React.FunctionComponent<NumberedListIconProps> = ({
  width = '1em',
  height = '1em',
}: NumberedListIconProps) => (
  <svg width={width} height={height}>
    <path d="M23,20H10c-0.6,0-1-0.4-1-1s0.4-1,1-1h13c0.6,0,1,0.4,1,1S23.6,20,23,20z M24,11c0-0.6-0.4-1-1-1H10c-0.6,0-1,0.4-1,1s0.4,1,1,1h13C23.6,12,24,11.6,24,11z M24,3c0-0.6-0.4-1-1-1H10C9.4,2,9,2.4,9,3s0.4,1,1,1h13C23.6,4,24,3.6,24,3z M2.9,2.1V10h1.8V0L3.1,0L0,1.9l0.9,1.4L2.9,2.1z M6.4,20.5H2c0.2-0.5,0.8-0.9,1.1-1.1l1.6-0.9c1-0.6,1.7-1.6,1.7-2.7c0-1.4-1.1-2.8-3.1-2.8c-1,0-1.8,0.3-2.3,0.9c-0.5,0.5-0.8,1.3-0.8,2l0,0.1l1.7,0.2v-0.2c0-0.3,0-0.6,0.1-0.8c0.3-0.5,0.7-0.8,1.3-0.8c0.9,0,1.4,0.7,1.4,1.3c0,0.8-0.5,1.2-1.2,1.6l-1.3,0.8c-1.8,1-2.1,2.3-2.1,3.2V22h6.4V20.5z"></path>
  </svg>
);

export default NumberedListIcon;

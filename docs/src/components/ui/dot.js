import React from 'react';
import {Element} from 'uinix-ui';

const Dot = ({color = 'brand.primary', isBordered, size = 'dot.m'}) => {
  return (
    <Element
      bg={color}
      borderRadius="round"
      b={isBordered ? 'bordered' : undefined}
      flex="none"
      h={size}
      w={size}
    />
  );
};

export default Dot;

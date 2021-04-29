import React from 'react';
import { Element } from 'uinix-ui';

import { EXAMPLE_TEXT } from '../../data.js';

const PreviewBox = ({ children = EXAMPLE_TEXT, styles: overrideStyles }) => {
  return (
    <Element boxShadow="m" p="m">
      <Element styles={overrideStyles}>{children}</Element>
    </Element>
  );
};

export default PreviewBox;

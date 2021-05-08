import React from 'react';
import {Element, Layout} from 'uinix-ui';

import Dot from './dot.js';

const PreviewContainer = ({children}) => {
  return (
    <Element b="bordered" borderRadius="m" boxShadow="m" my="m">
      <Layout align="center" bb="bordered" px="m" py="s" spacing="s">
        <Dot color="#ff5f56" />
        <Dot color="#ffbd2e" />
        <Dot color="#27c93f" />
      </Layout>
      <Element p="m">{children}</Element>
    </Element>
  );
};

export default PreviewContainer;

import React from 'react';
import { Provider as UinixProvider } from 'uinix-ui';

import icons from './icons.js';
import styles from './styles.js';
import theme from './theme.js';
import typography from './typography.js';

const Provider = ({ children }) => {
  return (
    <UinixProvider
      icons={icons}
      styles={styles}
      theme={theme}
      typography={typography}>
      {children}
    </UinixProvider>
  );
};

export default Provider;

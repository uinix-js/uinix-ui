import {createTheme} from 'uinix-theme';

import {createStyles} from '../styles/create-styles.js';
import {createTypography} from '../styles/create-typography.js';

export {defaults};

const defaults = {
  // Context
  icons: {},
  styles: createStyles(),
  theme: createTheme(),
  typography: createTypography(),
  // Configuration
  options: {
    isAtomicCss: false,
    responsiveAttributes: [],
    responsiveBreakpoints: [],
    shorthandStyleMapping: {},
  },
};

export { defaults };

import { createTheme } from 'uinix-theme';

const defaults = {
  // context
  icons: {},
  styles: {},
  theme: createTheme(),
  // configuration
  options: {
    componentStyles: {
      Element: [],
      Icon: [],
      Layout: [],
    },
    globalStyles: {},
    isAtomicCss: false,
  },
};

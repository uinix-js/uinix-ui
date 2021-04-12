export { defaults };

import { createTheme } from 'uinix-theme';

const defaults = {
  // context
  icons: {},
  styles: {
    components: {
      Element: [],
      Icon: [],
      Layout: [],
    },
    global: {},
    rules: {},
  },
  theme: createTheme(),
  // configuration
  options: {
    isAtomicCss: false,
  },
};

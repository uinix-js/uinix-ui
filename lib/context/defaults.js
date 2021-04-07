export { defaults };

import { createTheme } from 'uinix-theme';

const defaults = {
  icons: {},
  options: {
    isAtomicCss: false,
  },
  styles: {
    Element: [],
    Icon: [],
    Layout: [],
  },
  theme: createTheme(),
};

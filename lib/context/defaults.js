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
    styleShorthandsMapping: {
      backgroundColor: ['bg'],
      color: ['color'],
      marginBottom: ['mb', 'my', 'm'],
      marginLeft: ['ml', 'mx', 'm'],
      marginRight: ['mr', 'mx', 'm'],
      marginTop: ['mt', 'my', 'm'],
      paddingBottom: ['pb', 'py', 'p'],
      paddingLeft: ['pl', 'px', 'p'],
      paddingRight: ['pr', 'px', 'p'],
      paddingTop: ['pt', 'py', 'p'],
    },
  },
};

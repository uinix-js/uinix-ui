export { defaults };

import { createTheme } from 'uinix-theme';

const defaultCssAttributes = [
  'backgroundColor',
  'color',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
];

const defaults = {
  // context
  icons: {},
  styles: {
    components: {
      Element: [],
      Icon: [],
      Layout: [],
      Text: [],
    },
    global: {},
    rules: {},
  },
  theme: createTheme(),
  // configuration
  options: {
    isAtomicCss: false,
    responsiveAttributes: defaultCssAttributes,
    styleShorthandsMapping: {
      // based on defaultCssAttributes
      backgroundColor: ['bg'],
      color: ['color'],
      margin: ['m'],
      marginBottom: ['mb', 'my', 'm'],
      marginLeft: ['ml', 'mx', 'm'],
      marginRight: ['mr', 'mx', 'm'],
      marginTop: ['mt', 'my', 'm'],
      padding: ['b'],
      paddingBottom: ['pb', 'py', 'p'],
      paddingLeft: ['pl', 'px', 'p'],
      paddingRight: ['pr', 'px', 'p'],
      paddingTop: ['pt', 'py', 'p'],
    },
  },
};

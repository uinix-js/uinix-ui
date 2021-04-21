export { defaults };

import { createTheme } from 'uinix-theme';

import { createStyles } from '../styles/create-styles.js';
import { createTypography } from '../styles/create-typography.js';

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
  styles: createStyles(),
  theme: createTheme(),
  typography: createTypography(),
  // configuration
  options: {
    isAtomicCss: false,
    responsiveAttributes: defaultCssAttributes,
    shorthandStyleMapping: {
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

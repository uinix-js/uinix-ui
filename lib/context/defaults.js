export { defaults };

import { createTheme } from 'uinix-theme';

import { createStyles } from '../styles/create-styles.js';
import { createTypography } from '../styles/create-typography.js';

const defaultCssAttributes = [
  'backgroundColor',
  'borderRadius',
  'border',
  'borderBottom',
  'borderLeft',
  'borderRight',
  'borderTop',
  'boxShadow',
  'color',
  'flex',
  'height',
  'width',
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
  'position',
  'bottom',
  'left',
  'right',
  'top',
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
      borderRadius: ['borderRadius'],
      border: ['b'],
      borderBottom: ['bb', 'by', 'b'],
      borderLeft: ['bl', 'bx', 'b'], // CONFLICT WITH borderRadius (br)
      borderRight: ['br', 'bx', 'b'],
      borderTop: ['bt', 'by', 'b'],
      boxShadow: ['boxShadow'],
      color: ['color'],
      flex: ['flex'],
      height: ['h'],
      width: ['w'],
      margin: ['m'],
      marginBottom: ['mb', 'my', 'm'],
      marginLeft: ['ml', 'mx', 'm'],
      marginRight: ['mr', 'mx', 'm'],
      marginTop: ['mt', 'my', 'm'],
      padding: ['p'],
      paddingBottom: ['pb', 'py', 'p'],
      paddingLeft: ['pl', 'px', 'p'],
      paddingRight: ['pr', 'px', 'p'],
      paddingTop: ['pt', 'py', 'p'],
      position: ['position'],
      bottom: ['bottom'],
      left: ['left'],
      right: ['right'],
      top: ['top'],
    },
  },
};

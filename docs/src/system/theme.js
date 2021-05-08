import palx from 'palx';
import {createTheme} from 'uinix-ui';

const baseFontFamily =
  'apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol';

const borderStyles = {
  solid: 'solid',
};

const borderWidths = {
  s: '1px',
  m: '2px',
  l: '4px',
};

const brandPrimaryColor = '#0366d6';
const palette = Object.entries(palx(brandPrimaryColor)).reduce(
  (acc, [color, values]) => {
    if (!['base', 'black'].includes(color)) {
      acc[color] = {};
      values.forEach((value, i) => {
        acc[color][i] = value;
      });
    }

    return acc;
  },
  {},
);

const brandSecondaryColor = palette.gray[8];
const brandInverseColor = palette.gray[0];
const brandLightColor = palette.gray[6];
const brandLighterColor = palette.gray[2];
const brandWashColor = palette.blue[0];
const brandBorderColor = palette.gray[2];

const theme = createTheme({
  borders: {
    bordered: `${borderWidths.s} ${borderStyles.solid} ${brandBorderColor}`,
  },
  borderStyles,
  borderWidths,
  colors: {
    black: 'black',
    white: 'white',
    brand: {
      active: brandPrimaryColor,
      primary: brandPrimaryColor,
      primaryInverse: brandInverseColor,
      secondary: brandSecondaryColor,
      light: brandLightColor,
      lighter: brandLighterColor,
      wash: brandWashColor,
    },
    icon: {
      default: brandLightColor,
    },
    text: {
      primary: palette.gray[9],
      secondary: palette.gray[6],
    },
    tone: {
      error: 'red',
    },
  },
  fontFamilies: {
    body: baseFontFamily,
    heading: baseFontFamily,
    monospace: 'menlo, consolas, monospace',
  },
  fontSizes: {
    s: '12px',
    m: '16px',
    l: '20px',
    xl: '28px',
    xxl: '32px',
  },
  fontWeights: {
    light: 300,
    body: 400,
    bold: 700,
  },
  lineHeights: {
    body: 2,
    heading: 1.25,
  },
  letterSpacings: {
    body: 'normal',
  },
  opacities: {
    invisible: '0',
    disabled: '0.3',
    interactive: '0.7',
    visible: '1',
  },
  radii: {
    m: '4px',
    round: '100%',
  },
  shadows: {
    m:
      '0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)',
  },
  sizes: {
    dot: {
      m: '12px',
      l: '32px',
    },
    icon: {
      s: '16px',
      m: '24px',
      l: '28px',
      xl: '48px',
    },
    height: {
      editor: '500px',
    },
    width: {
      container: '768px',
    },
  },
  spacings: {
    xs: 4,
    s: 8,
    m: 16,
    l: 32,
    xl: 64,
  },
  zIndices: {
    forward: '1',
  },
});

export default theme;

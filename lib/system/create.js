import {merge} from 'uinix-fp';
import {createTheme as createUinixTheme} from 'uinix-theme';

export {createConfig, createIcons, createStyles, createSystem, createTheme};

const createConfig = (config = {}) =>
  merge({
    elementShorthandPropsMapping: {},
    elementStyles: [],
    enableAtomicCss: false,
    responsiveCssProperties: [],
  })(config);

const createIcons = (icons = {}) => icons;

const createStyles = (styles = {}) =>
  merge({
    breakpoints: [],
    global: {},
    typography: {
      fontFaces: {},
      global: {},
      variants: {},
    },
    variants: {},
  })(styles);

const createSystem = (system = {}) => {
  const icons = createIcons(system.icons);
  const styles = createStyles(system.styles);
  const theme = createTheme(system.theme);
  return {
    icons,
    styles,
    theme,
  };
};

const createTheme = createUinixTheme;

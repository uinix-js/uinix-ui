import {merge} from 'uinix-fp';
import {createTheme} from 'uinix-theme';

export {createConfig, createIcons, createStyles, createSystem};

const createConfig = (config = {}) =>
  merge({
    elementShorthandPropsMapping: {},
    elementStyles: [],
    enableAtomicCss: false,
    enableCssVariables: false,
    namespace: null,
    responsiveBreakpoints: [],
    responsiveCssProperties: [],
  })(config);

const createIcons = (icons = {}) => icons;

const createStyles = (styles = {}) =>
  merge({
    global: {},
    typography: {
      fontFaces: {},
      global: {},
      variants: {},
    },
    variants: {},
  })(styles);

const createSystem = (system = {}) => {
  const {icons, styles, theme, themeSpec = {}} = system;
  return {
    icons: createIcons(icons),
    styles: createStyles(styles),
    theme: createTheme(theme, themeSpec),
    themeSpec,
  };
};

export {createTheme} from 'uinix-theme';

import {merge} from 'uinix-fp';
import {createTheme as createUinixUiTheme} from 'uinix-theme';

export {createConfig, createIcons, createStyles, createSystem, createTheme};

/**
 * @typedef {import('../types.js').Config} Config
 * @typedef {import('../types.js').System} System
 * @typedef {import('../types.js').SystemIcons} SystemIcons
 * @typedef {import('../types.js').SystemStyles} SystemStyles
 */

/**
 * Creates configuration for the system and components.
 *
 * @param {Partial<Config>} [config]
 * @returns {Config}
 */
const createConfig = (config = {}) =>
  merge({
    elementShorthandPropsMapping: {},
    elementStyles: [],
    enableAtomicCss: false,
    responsiveCssProperties: [],
  })(config);

/**
 * Creates and defines all SVG icons for the system.
 *
 * @param {SystemIcons} [icons]
 * @returns {SystemIcons}
 */
const createIcons = (icons = {}) => icons;

/**
 * Creates all styles for the system.
 *
 * @param {Partial<SystemStyles>} [styles]
 * @returns {SystemStyles}
 */
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

/**
 * Creates the source of truth for the `icons`, `styles`, `theme` spec.
 *
 * @param {Partial<System>} [system]
 * @returns {System}
 */
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

const createTheme = createUinixUiTheme;

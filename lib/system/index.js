import {createConfig} from './config.js';
import {createIcons} from './icons.js';
import {createStyles} from './styles.js';
import {createTheme} from './theme.js';
import {createTypography} from './typography.js';

export {createSystem};

/**
 * @typedef System The uinix system of specs.
 * @property {import('./icons.js').Icons} icons `Icons` spec defining the mapping of icon key to SVG content.
 * @property {import('./styles.js').Styles} styles `Styles` spec defining all style rules, global styles, and variants.
 * @property {import('uinix-theme/lib/create-theme.js').Theme} theme `Theme` spec defining all theme properties with associated theme property values.
 * @property {import('./typography.js').TypographyStyles} typography `TypographyStyles` spec defining all typographic styles (will be merged into `styles`).
 * @property {import('./config.js').Config} config Configuration for the system (`Element` component, `styles`).
 */

/**
 * Creates a uinix system of specs.
 *
 * Does not mutate the provided system.
 *
 * @param {Partial<System>} system
 * @returns {System}
 */
const createSystem = (system = {}) => {
  const config = createConfig(system.config);
  const icons = createIcons(system.icons);
  const typography = createTypography(system.typography);
  const styles = createStyles(system.styles, typography);
  const theme = createTheme(system.theme);
  return {
    config,
    icons,
    styles,
    theme,
    typography,
  };
};

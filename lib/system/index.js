import {createIcons} from './icons.js';
import {createOptions} from './options.js';
import {createStyles} from './styles.js';
import {createTheme} from './theme.js';
import {createTypography} from './typography.js';

export {createSystem};

/**
 * @typedef {import('./icons').Icons} Icons
 * @typedef {import('./options').Options} Options
 * @typedef {import('./styles').Styles} Styles
 * @typedef {import('uinix-theme/lib/create-theme.js').Theme} Theme
 *
 * @typedef {{
 *  icons: Icons;
 *  options: Options;
 *  styles: Styles;
 *  theme: Theme;
 *  typography?: Styles;
 * }} System The uinix system of specs.
 */

/**
 * Creates a uinix system of specs.
 *
 * Does not mutate the provided system.
 *
 * @param {Partial<System>} system
 * @returns {System}
 */
const createSystem = (system = {}) => ({
  icons: createIcons(system.icons),
  options: createOptions(system.options),
  styles: createStyles(system.styles, createTypography(system.typography)),
  theme: createTheme(system.theme),
});

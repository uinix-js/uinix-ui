import {props} from 'uinix-fp';

import {parseSvgElement} from '../util/parse-svg-element.js';
import {getStore} from './load.js';

export {
  useConfig,
  useCss,
  useH,
  useIcon,
  useStyles,
  useSystem,
  useTheme,
  useTypographyVariant,
  useVariant,
};

/**
 * @typedef {import('../types.js').AnyProps} AnyProps
 * @typedef {import('../types.js').Config} Config
 * @typedef {import('../types.js').CssRenderer} CssRenderer
 * @typedef {import('../types.js').H} H
 * @typedef {import('../types.js').Store} Store
 * @typedef {import('../types.js').StyleDefinition} StyleDefinition
 * @typedef {import('../types.js').System} System
 * @typedef {import('../types.js').SystemStyles} SystemStyles
 * @typedef {import('../types.js').SystemTheme} SystemTheme
 */

/**
 * Retrieves the `config` attached to the store.
 *
 * @returns {Config}
 */
const useConfig = () => getStore().config;

/**
 * Retrieves the `css` method attached with the provided `props`.
 *
 * @param {AnyProps} [props]
 * @returns {CssRenderer}
 */
const useCss = (props) => getStore().createCssRenderer(props);

/**
 * Retrieves the `h` callback.
 *
 * @returns {H}
 */
const useH = () => getStore().h;

/**
 * Retrieves and renders an SVG element from `system.icons`.
 *
 * @param {string} icon
 *    An icon property path in `system.icons`.
 * @returns {ReturnType<H> | null}
 */
const useIcon = (icon) => {
  const svg = props(icon)(useSystem().icons);
  const h = useH();
  return parseSvgElement({h, svg});
};

/**
 * Retrieves `system.styles`.
 *
 * @returns {SystemStyles}
 */
const useStyles = () => useSystem().styles;

/**
 * Retrieves `system`.
 *
 * @returns {System}
 */
const useSystem = () => getStore().system;

/**
 * Retrieves `system.theme`.
 *
 * @param {string} [path]
 *    Theme property path
 * @returns {SystemTheme}
 */
const useTheme = (path = '') => props(path)(useSystem().theme);

/**
 * Retrieves the typography variant style in
 * `system.styles.typography.variants[variant]`.
 *
 * @param {string} variant
 *    Variant property path
 * @returns {StyleDefinition | undefined}
 */
const useTypographyVariant = (variant) =>
  props(`typography.variants.${variant}`)(useSystem().styles);

/**
 * Retrieves the variant style in `system.styles.variants[variant]`.
 *
 * @param {string} variant
 *    Variant property path
 * @returns {StyleDefinition | undefined}
 */
const useVariant = (variant) =>
  props(`variants.${variant}`)(useSystem().styles);

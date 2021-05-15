import {useContext} from 'react';
import {useFela} from 'react-fela/es/index.js';
import {props} from 'uinix-fp';

import {Context} from './context.js';

export {useCss, useIcon, useStyles, useSystem, useTheme, useVariant};

/**
 * A utility to merge `Styles` and apply `StyleProps`.
 *
 * Renders the CSS and returns the CSS `className` string.
 *
 * @param {import('../system/styles.js').StyleProps} props
 * @returns {(styles: import('../system/styles.js').OneOrManyStyle[]) => string} CSS `className` string
 */
const useCss = (props) => useFela(props).css;

/**
 * Returns the Icon SVG content for a corresponding icon key defined by the system.
 *
 * @param {string} icon A valid icon key specified in `Icons`.
 * @returns {string | undefined} Icon SVG content.
 */
const useIcon = (icon) => useSystem().icons[icon];

const useStyles = () => useSystem().styles;

/**
 * Returns the entire `System` specs.
 *
 * @returns {import('../system/index.js').System}
 */
const useSystem = () => useContext(Context);

/**
 * Returns the `Theme` spec.
 *
 * @returns {import('uinix-theme/lib/create-theme.js').Theme}
 */
const useTheme = () => useSystem().theme;

/**
 * Returns the variant `Style` defined in `styles.variants`.
 *
 * @param {string} variant A valid style property path e.g. "Button.primary".
 * @returns {import('../system/styles.js').Style}
 */
const useVariant = (variant) =>
  props(`variants.${variant}`)(useSystem().styles);

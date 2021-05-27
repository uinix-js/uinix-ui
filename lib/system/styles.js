import {merge} from 'uinix-fp';

import {TEXT_VARIANT_KEY} from '../constants.js';
import {createTypography} from './typography.js';

export {createStyles};

/**
 * @typedef {Object.<string, any>} StyleProps
 *
 * @typedef FontFace A `FontFace` defines font resources and other optional font properties.
 * @property {string[]} src An array of font resources specified as either absolute URLs or relative paths.
 * @property {string} [fontStretch] The CSS `font-stretch` property
 * @property {string} [fontStyle] The CSS `font-style` property
 * @property {string} [fontVariant] The CSS `font-variant` property
 * @property {string} [fontWeight] The CSS `font-weight` property
 * @property {string} [unicodeRange] The CSS `unicode-range` property
 *
 * @typedef {Object.<string, FontFace>} FontFaces
 *
 * @typedef {Object.<string, any>} StyleObject A `StyleObject` must be a JSON serializable object.  `StyleObject`s can be arbitrarily nested (following valid CSS-in-JS rules and pseudo-selectors) and should resolve into valid CSS property value(s).
 *
 * @callback StyleFunction A `StyleFunction` takes `StyleProps` and returns a `StyleObject`.
 * @param {StyleProps} props
 * @returns {StyleObject}
 *
 * @typedef {StyleObject | StyleFunction | null} Style A `Style` can be either a `StyleObject`, a `StyleFunction`, or `null`.
 *
 * @typedef {Style | Style[]} OneOrManyStyle a type alias for either singleton or arrays of `Style` types.
 *
 * @typedef {{
 *   [key: string]: Style;
 *   fontFaces: FontFaces;
 *   global: Object.<string, Style>;
 *   variants: Object.<string, Style>;
 * }} Styles A `Styles` contains `Style` objects, that may also be organized under the `global` and `variants` properties.  `FontFaces` are specified under the `fontFaces` property.
 *

/**
 * Creates a valid styles object by deepmerging with the provided styles.
 *
 * Does not mutate the provided styles.
 *
 * Merges the typography styles and variants into the main styles object.
 *
 * @param {Partial<Styles>} styles
 * @param {Styles} typography
 * @returns {Styles}
 */
const createStyles = (styles = {}, typography = createTypography()) =>
  merge(styles)({
    ...typography,
    variants: {
      [TEXT_VARIANT_KEY]: typography.variants,
    },
  });

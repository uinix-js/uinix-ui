import {merge} from 'uinix-fp';

export {createStyles};

/**
 * @typedef {Object.<string, any>} StyleProps
 *
 * @typedef {Object.<string, any>} StyleObject A `StyleObject` must be a JSON serializable object.  `StyleObject`s can be arbitrarily nested (following valid CSS-in-JS rules and pseudo-selectors) and should resolve into valid CSS property value(s).
 *
 * @callback StyleFunction A `StyleFunction` takes `StyleProps` and returns a `StyleObject`.
 * @param {StyleProps} props
 * @returns {StyleObject}
 *
 * @typedef {StyleObject | StyleFunction} Style A `Style` can be either a `StyleObject`, a `StyleFunction`
 *
 * @typedef {Style | Style[]} OneOrManyStyle a type alias for either singleton or arrays of `Style` types.
 *
 * * @typedef FontFace A `FontFace` defines font resources and other optional font properties.
 * @property {string[]} src An array of font resources specified as either absolute URLs or relative paths.
 * @property {string} [fontStretch] The CSS `font-stretch` property
 * @property {string} [fontStyle] The CSS `font-style` property
 * @property {string} [fontVariant] The CSS `font-variant` property
 * @property {string} [fontWeight] The CSS `font-weight` property
 * @property {string} [unicodeRange] The CSS `unicode-range` property
 *
 * @typedef {Object.<string, FontFace>} FontFaces
 *
 * @typedef {{
 *   [key: string]: Style;
 *   global: Object.<string, StyleObject>;
 *   variants: Object.<string, StyleObject>;
 *   typography: {
 *     fontFaces: FontFaces;
 *     global: Object.<string, StyleObject>;
 *     variants: Object.<string, StyleObject>;
 *   }
 * }} Styles
 *

/**
 * Creates a valid styles object by deepmerging with the provided styles.
 *
 * Does not mutate the provided styles.
 *
 * @param {Partial<Styles>} styles
 * @returns {Styles}
 */
const createStyles = (styles = {}) =>
  merge({
    breakpoints: [],
    global: {},
    variants: {},
    typography: {
      fontFaces: {},
      global: {},
      variants: {},
    },
  })(styles);

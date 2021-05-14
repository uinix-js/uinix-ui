import {merge} from 'uinix-fp';

export {createOptions};

/**
 * @typedef {import('./styles.js').Style} Style
 *
 * @typedef {{[key: string]: string[]}} ShorthandPropsMapping A mapping of CSS property to an array of prop names.  Values assigned to these props will be applied as styles to the corresponding CSS property.  Props specified earlier in the array takes precedence.
 *
 * @typedef ElementOptions
 * @property {ShorthandPropsMapping} shorthandPropsMapping
 * @property {Style[]} styles An array of styles that will be applied to the Element component.  These styles will use the component `props` (note not `styleProps`) when applied to style functions.
 *
 * @typedef StylesOptions
 * @property {boolean} isAtomicCss If true, will use atomic CSS to applied styles.
 * @property {string[]} responsiveAttributes An array of CSS properties that are whitelisted and support responsive styling when CSS property values are specified in an array, and when used with the `responsiveBreakpoints` option.
 * @property {string[]} responsiveBreakpoints An array of media query breakpoints (min-width-based) to support responsive styling when used with the `responsiveAttributes` option.
 *
 * @typedef Options Configure the system with the following options.
 * @property {ElementOptions} element Configure Element component behaviors.
 * @property {StylesOptions} styles Configure styles behaviors.
 */

/**
 * Creates a valid Options object by deepmerging with the provided options.
 *
 * Does not mutate the provided options.
 *
 * @param {Partial<Options>} options
 * @returns {Options}
 */
const createOptions = (options = {}) =>
  merge({
    element: {
      shorthandPropsMapping: {},
      styles: [],
    },
    styles: {
      isAtomicCss: false,
      responsiveAttributes: [],
      responsiveBreakpoints: [],
    },
  })(options);

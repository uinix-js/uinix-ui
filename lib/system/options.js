import {merge} from 'uinix-fp';

export {createOptions};

/**
 * @typedef {Object.<string, string[]>} ShorthandPropsMapping A mapping of CSS property to an array of prop names.  Values assigned to these props will be applied as styles to the corresponding CSS property.  Props specified earlier in the array takes precedence.
 *
 * @typedef ElementOptions
 * @property {ShorthandPropsMapping} shorthandPropsMapping
 * @property {import('./styles.js').Style[]} styles An array of styles that will be applied to the `Element` component.  These styles will use the component `props` (note: not `styleProps`) when applying to `StyleFunction`s.
 *
 * @typedef StylesOptions
 * @property {boolean} isAtomicCss If true, will use atomic CSS to process applied styles.
 * @property {string[]} responsiveBreakpoints An array of media query breakpoints (`min-width`-based) to support responsive styling when used with the `responsiveCssProperties` option.
 * @property {string[]} responsiveCssProperties An array of CSS properties specifying that array-based CSS property values specified on styles should apply responsive styling when paired with the corresponding `responsiveBreakpoints` option.
 *
 * @typedef Options Additional configuration for the system.
 * @property {ElementOptions} element Configures additional `Element` component behaviors.
 * @property {StylesOptions} styles Configures additional `styles` behaviors.
 */

/**
 * Creates a valid system options by deepmerging with the provided options.
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
      responsiveBreakpoints: [],
      responsiveCssProperties: [],
    },
  })(options);

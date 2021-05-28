import {merge} from 'uinix-fp';

export {createConfig};

/**
 * @typedef {Object.<string, string[]>} ShorthandPropsMapping A mapping of CSS property to an array of prop names.  Values assigned to these props will be applied as styles to the corresponding CSS property.  Props specified earlier in the array takes precedence.
 *
 * @typedef Config Additional configuration for the system.
 * @property {ShorthandPropsMapping} elementShorthandPropsMapping
 * @property {import('./styles.js').Style[]} elementStyles An array of styles that will be applied to the `Element` component.  These styles will use the component `props` (note: not `styleProps`) when applying with `StyleFunction`s.
 * @property {boolean} isAtomicCss If true, will use atomic CSS to process applied styles.
 *  * @property {string[]} responsiveCssProperties An array of CSS properties specifying that array-based CSS property values specified on styles should apply responsive styling when paired with the corresponding `responsiveBreakpoints` property
 */

/**
 * Creates a valid system config by deepmerging with the provided config.
 *
 * Does not mutate the provided config.
 *
 * @param {Partial<Config>} config
 * @returns {Config}
 */
const createConfig = (config = {}) =>
  merge({
    elementShorthandPropsMapping: {},
    elementStyles: [],
    isAtomicCss: false,
    responsiveCssProperties: [],
  })(config);

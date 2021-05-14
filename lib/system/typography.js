import {merge} from 'uinix-fp';

export {createTypography};

/**
 * @typedef {import('./styles.js').Styles} Styles
 */

/**
 * Creates a valid Typography styles by deepmerging with the provided typography styles.
 *
 * Does not mutate the provided typography styles.
 *
 * @param {Partial<Styles>} typography
 * @returns {Styles}
 */
const createTypography = (typography = {}) =>
  merge({
    fontFaces: {},
    global: {},
    variants: {},
  })(typography);

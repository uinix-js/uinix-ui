import {merge} from 'uinix-fp';

export {createTypography};

/**
 * @typedef {import('./styles.js').Styles} TypographyStyles `TypographyStyles` are just `Styles`.
 */

/**
 * Creates a valid typography styles by deepmerging with the provided typography styles.
 *
 * Does not mutate the provided typography styles.
 *
 * @param {Partial<TypographyStyles>} typography
 * @returns {TypographyStyles}
 */
const createTypography = (typography = {}) =>
  merge({
    fontFaces: {},
    global: {},
    variants: {},
  })(typography);

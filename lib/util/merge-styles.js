export {mergeStyles};

/**
/**
 * @typedef {import('../types.js').Style} Style
 * @typedef {import('../types.js').Styles} Styles
 */

/**
 * Merges nested arrays of styles (objects, functions, null, undefined) into a
 * flat array.
 *
 * @param {Styles[]} styles
 * @returns {Style[]}
 */
const mergeStyles = (styles) => styles.flat();

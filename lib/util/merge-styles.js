export {mergeStyles};

/**
 * @typedef {import('../types.js').Style} Style
 * @typedef {import('../types.js').Styles} Styles
 */

/**
 * Merges and flattens array of styles
 *
 * @param {Styles[]} styles
 * @returns {Style[]}
 */
const mergeStyles = (styles) => styles.flat();

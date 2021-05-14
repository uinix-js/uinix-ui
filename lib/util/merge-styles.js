export {mergeStyles};

/**
 * @typedef {import('../system/styles.js').Style} Style
 *
 * @typedef {Style | Style[]} Styles
 */

/**
 * Merges an array of possible nested styles into a flat array.
 *
 * @param {Styles[]} styles
 * @returns {Styles[]}
 */
const mergeStyles = (styles) => styles.flat();

export {mergeStyles};

/**
 * Merges an array of possibly nested styles into a flat array of styles.
 *
 * @param {import('../system/styles.js').OneOrManyStyle[]} styles
 * @returns {import('../system/styles.js').Style[]}
 */
const mergeStyles = (styles) => styles.flat();

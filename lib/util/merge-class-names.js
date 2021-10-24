import {filter} from 'uinix-fp';

export {mergeClassNames};

/**
 * Merges an array of class names into a space-separated string.
 *
 * Filters out empty class names.
 * Returns undefined if the result is the empty string.
 *
 * @param {string[]} classNames
 * @returns {string | undefined}
 */
const mergeClassNames = (classNames) =>
  filter()(classNames).join(' ') || undefined;

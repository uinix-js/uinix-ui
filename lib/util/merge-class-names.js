import {filter} from 'uinix-fp';

export {mergeClassNames};

/**
 * Merges an array of `classNames` into a space-separated `className` string.
 *
 * Filters empty `classNames` and returns `undefined` if the merged `className` is empty.
 *
 * @param {string[]} classNames
 * @returns {string | void}
 */
const mergeClassNames = (classNames) =>
  filter()(classNames).join(' ') || undefined;

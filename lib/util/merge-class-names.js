import {isTruthy} from 'uinix-fp';

/**
 * Merges an array of class names into a space-separated string.
 *
 * Filters out empty class names.
 * Returns undefined if the result is the empty string.
 *
 * @param {string[]} classNames
 * @returns {string | undefined}
 */
export const mergeClassNames = (classNames) =>
  classNames.filter(isTruthy).join(' ') || undefined;

import {filterEntries} from 'uinix-fp';

/**
 * @typedef {import('../types.js').StyleObject} StyleObject
 */

/**
 * Filters for only defined entries of a style object.
 *
 * @template {StyleObject} X
 * @param {X} x style object
 * @returns {Partial<X>}
 */
export const filterStyle = filterEntries(([_k, v]) => v !== undefined);

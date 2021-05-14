import {i} from 'uinix-fp';

export {createIcons};

/**
 * @typedef {{[key: string]: string}} Icons a mapping of icon key to icon svg content.
 */

/**
 * @type {(icons: Icons) => Icons} Passthrough (identity) function
 */
const createIcons = i;

import {toH} from 'hast-to-hyperscript';
import {parse} from 'svg-parser';

/**
 * @typedef {import('../types.js').H} H
 */

/**
 * Renders an SVG string with the provided `h` element and returns an SVG element.
 *
 * @template {H} H
 * @param {string} svg
 * @param {object} params
 * @param {H} params.createElement
 * @returns {ReturnType<H> | null}
 */
export const parseSvgElement = (svg, {createElement}) => {
  try {
    return toH(createElement, parse(svg));
  } catch {
    return null; // Swallow error and return null if SVG fails to parse.
  }
};

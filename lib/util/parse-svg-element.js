import {toH} from 'hast-to-hyperscript';
import {parse} from 'svg-parser';

/**
 * @typedef {import('../types.js').H} HH
 */

/**
 * Renders an SVG string with the provided `h` element and returns an SVG element.
 *
 * @template {HH} H
 * @param {string} svg
 * @param {object} params
 * @param {H} params.h
 * @returns {ReturnType<H> | null}
 */
export const parseSvgElement = (svg, {h}) => {
  try {
    return toH(h, parse(svg ?? ''));
  } catch {
    return null; // Swallow error and return null if SVG fails to parse.
  }
};

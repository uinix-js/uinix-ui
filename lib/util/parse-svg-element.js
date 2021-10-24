import {toH} from 'hast-to-hyperscript';
import {parse} from 'svg-parser';

export {parseSvgElement};

/**
 * @typedef {import('../types.js').H} H
 */

/**
 * Renders an SVG string with the provided `h` into an SVG element.
 *
 * @param {object} options
 * @param {H} options.h
 * @param {string} [options.svg]
 * @returns {ReturnType<H> | null}
 */
const parseSvgElement = ({h, svg}) => {
  if (!svg) {
    return null;
  }

  try {
    return toH(h, parse(svg));
  } catch {
    // Swallow error and return null if SVG fails to parse.
    return null;
  }
};

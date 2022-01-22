import {toH} from 'hast-to-hyperscript';
import {parse} from 'svg-parser';

export {parseSvgElement};

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

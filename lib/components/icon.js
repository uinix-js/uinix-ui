import {toH} from 'hast-to-hyperscript';
import {parse} from 'svg-parser';
import {filter} from 'uinix-fp';

import {useH, useIcon} from '../system/hooks.js';
import {mergeStyles} from '../util/merge-styles.js';
import {Element} from './element.js';

export {Icon};

/**
 * @typedef {{
 *   icon: string;
 *   color?: string;
 *   height?: string | number;
 *   size?: string | number;
 *   width?: string | number;
 * } & import('./element.js').ElementProps} IconProps
 */

/**
 * `Icon` is the primitive component to access icons defined by the system.
 *
 * Given a valid `icon` prop, the corresponding SVG content will be rendered with provided stylistic props (e.g. `color`, `height`, `size`, `width`).  If an `onClick` handler is specified, the `icon` will render as a `HTMLButtonElement`.
 *
 * `Icon` is composed from `Element`.
 *
 * @param {IconProps} props
 */
const Icon = (props) => {
  const {
    color,
    height,
    icon,
    size,
    styleProps,
    styles,
    width,
    onClick,
    ...restProps
  } = props;

  const h = useH();
  const iconSvg = useIcon(icon);

  const style = filter((x) => x !== undefined)({
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color,
    display: 'flex',
    flex: 'none',
    margin: 0,
    padding: 0,
    '> svg': {
      height: height || size,
      width: width || size,
    },
  });

  const svgElement = parseSvgElement({content: iconSvg, h});

  return Element({
    ...restProps,
    as: onClick ? 'button' : 'div',
    children: svgElement,
    styleProps,
    styles: mergeStyles([style, styles]),
    onClick,
  });
};

const parseSvgElement = ({content, h}) => {
  try {
    return toH(h, parse(content));
  } catch {
    // Swallow error and return null if SVG fails to parse.
    return null;
  }
};

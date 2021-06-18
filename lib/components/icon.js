import {toH} from 'hast-to-hyperscript';
import parse from 'rehype-parse';
import {filter} from 'uinix-fp';
import unified from 'unified';

import {useIcon, useSystem} from '../system/api.js';
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
  const system = useSystem();
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

  const {h} = system.config;

  const svg = parseSvg({content: iconSvg, h});

  return Element({
    ...restProps,
    as: onClick ? 'button' : 'div',
    children: svg,
    styleProps,
    styles: mergeStyles([style, styles]),
    onClick,
  });
};

const parseSvg = ({content, h}) => {
  const tree = unified()
    .use(parse, {
      fragment: true,
    })
    .parse(content);

  return toH(h, tree);
};

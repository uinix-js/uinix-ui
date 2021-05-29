import {createElement} from 'react';
import InlineSvg from 'react-inlinesvg';
import {filter} from 'uinix-fp';

import {useIcon} from '../context/hooks.js';
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
 * @returns {import('react').ReactElement}
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

  const iconSvg = useIcon(icon);

  const style = filter((x) => x !== undefined)({
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color,
    display: 'flex',
    flex: 'none',
    height: height || size,
    width: width || size,
  });

  return createElement(
    Element,
    {
      ...restProps,
      as: onClick ? 'button' : 'div',
      styleProps,
      styles: mergeStyles([style, styles]),
      onClick,
    },
    createElement(InlineSvg, {
      height: '100%',
      src: iconSvg,
      width: '100%',
    }),
  );
};

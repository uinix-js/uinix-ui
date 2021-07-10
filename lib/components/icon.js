import {filter} from 'uinix-fp';

import {useIcon} from '../system/hooks.js';
import {mergeStyles} from '../util/merge-styles.js';
import {Element} from './element.js';

export {Icon};

/**
 * @typedef {import('../types.js').AnyProps} AnyProps
 * @typedef {import('../types.js').H} H
 * @typedef {import('../types.js').Styles} Styles
 *
 * @typedef IconProps
 * @property {string} [color]
 *    Sets the icon SVG container's `color`.  You can use a theme-based value.
 *    If an icon SVG is using `'currentColor'` for appropriate color attributes
 *    (e.g. `stroke`, `fill`), the `Icon will apply the specified color to the
 *    rendered `HTMLSVGElement`.
 * @property {string|number} [height]
 *    Sets the icon SVG's `height`.  You can use a theme-based value.
 * @property {string} [icon='']
 *    Renders the specified icon from `system.icons[icon]` as an
 *    `HTMLSVGElement`.
 * @property {string|number} [size]
 *    Sets the icon SVG's `height` and `width`.  You can use a theme-based
 *    value.
 * @property {AnyProps} [styleProps]
 *    Style props are used by style functions provided in the `styles` prop.
 * @property {Styles} [styles]
 *    Style objects or style functions can be provided as a single value or in
 *    array-form for composition.
 * @property {string|number} [width]
 *    Sets the icon SVG's `width`.  You can use a theme-based value.
 * @property {string} [variant]
 *    A variant is a property path that accesses a style in
 *    `system.styles.variants[variant]`.
 * @property {function} [onClick]
 *    Click handler for the icon.  If specified, will render `Icon` as
 *    a semantic `HTMLButtonElement` instead of a `HTMLDivElement`.
 */

/**
 * `Icon` is a component primitive interoperating with the `system.icons` spec.
 *
 * It provides easy ways to render and configure SVG icons.
 *
 * `Icon` is composed from `Element`, and therefore inherits all properties and
 * configurations from `Element`.
 *
 * @param {AnyProps & IconProps} props
 * @returns {ReturnType<H>}
 */
const Icon = (props) => {
  const {
    color,
    height,
    icon = '',
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
    margin: 0,
    padding: 0,
    '> svg': {
      height: height || size,
      width: width || size,
    },
  });

  return Element({
    ...restProps,
    as: onClick ? 'button' : 'div',
    children: iconSvg,
    styleProps,
    styles: mergeStyles([style, styles]),
    onClick,
  });
};

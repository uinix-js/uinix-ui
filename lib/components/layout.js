import {filter} from 'uinix-fp';

import {mergeStyles} from '../util/merge-styles.js';
import {Element} from './element.js';

export {Layout};

/**
 * @typedef {import('../types.js').AnyProps} AnyProps
 * @typedef {import('../types.js').CustomElement} CustomElement
 * @typedef {import('../types.js').H} H
 * @typedef {import('../types.js').ResponsiveStyleValue} ResponsiveStyleValue
 * @typedef {import('../types.js').Styles} Styles
 *
 * @typedef LayoutProps
 * @property {string | CustomElement} [as="div"]
 *    Renders `Layout` as the specified HTML element or `CustomElement`.
 *    Renders as a `HTMLDivElement` by default.
 * @property {ResponsiveStyleValue} [direction]
 *    Sets the `flexDirection` CSS property.
 * @property {boolean} [inline]
 *    If `true`, sets the `display` CSS property to `'inline-flex'`, otherwise
 *    sets to `'flex'` by default.
 * @property {ResponsiveStyleValue} [spacing]
 *    Spaces all children (except the last child) evenly by the specified
 *    margin value.  You can use a theme-based value.
 * @property {boolean} [wrap]
 *    If `true`, sets the `flexWrap` CSS property to `'wrap'`, otherwise it is
 *    set to `undefined` by default.
 * @property {ResponsiveStyleValue} [wrapSpacing]
 *    If `props.wrap` is set to `true`, you may space all wrapped children with
 *    the specified vertical margin value.  A negative margin is applied on the
 *    `Layout` element.  You can use a theme-based value.
 * @property {string} [variant]
 *    A variant is a property path that accesses a style in
 *    `system.styles.variants[variant]`.
 * @property {AnyProps} [styleProps]
 *    Style props are used by style functions provided in the `styles` prop.
 * @property {Styles} [styles]
 *    Style objects or style functions can be provided as a single value or in
 *    array-form for composition.
 * @property {ResponsiveStyleValue} [align]
 *    Sets the `alignItems` CSS property.
 * @property {ResponsiveStyleValue} [alignSelf]
 *    Sets the `alignSelf` CSS property.
 * @property {ResponsiveStyleValue} [flex]
 *    Sets the `flex` CSS property.
 * @property {ResponsiveStyleValue} [justify]
 *    Sets the `justifyContent` CSS property.
 * @property {ResponsiveStyleValue} [justifySelf]
 *    Sets the `justifySelf` CSS property.
 */

/**
 * `Layout` is a component primitive interoperating with the
 * `system.theme.spacings` spec.
 *
 * It provides an easy way to rapidly build flexbox-based layouts to
 * consistently space child elements based on theme values defined in
 * `system.theme.spacings`.  It also provides convenient flexbox props to
 * configure common UI layouts.
 *
 * `Layout` is composed from `Element`, and therefore inherits all properties
 * and configurations from `Element`.
 *
 * @param {AnyProps & LayoutProps} props
 * @returns {ReturnType<H>}
 */
const Layout = (props) => {
  const {
    align,
    alignSelf,
    direction,
    flex,
    inline,
    justify,
    justifySelf,
    spacing,
    styleProps,
    styles,
    wrap,
    wrapSpacing,
    ...restProps
  } = props;

  const style = filter((x) => x !== undefined)({
    alignItems: align,
    alignSelf,
    display: inline ? 'inline-flex' : 'flex',
    flex,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    justifyContent: justify,
    justifySelf,
    marginTop: `-${wrap ? wrapSpacing : undefined}`,
    '> :not(:last-child)': {
      [direction === 'column' ? 'marginBottom' : 'marginRight']: spacing,
      marginTop: wrapSpacing,
    },
    '> :last-child': {
      marginTop: wrapSpacing,
    },
  });

  return Element({
    ...restProps,
    styleProps,
    styles: mergeStyles([style, styles]),
  });
};

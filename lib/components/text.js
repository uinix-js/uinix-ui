import {filter} from 'uinix-fp';

import {useTypographyVariant} from '../system/hooks.js';
import {mergeStyles} from '../util/merge-styles.js';
import {Element} from './element.js';

export {Text};

/**
 * @typedef {import('../types.js').AnyProps} AnyProps
 * @typedef {import('../types.js').CustomElement} CustomElement
 * @typedef {import('../types.js').H} H
 * @typedef {import('../types.js').Styles} Styles
 *
 * @typedef TextProps
 * @property {string|CustomElement} [as="span"]
 *    Renders `Text` as the specified HTML element or `CustomElement`.
 *    Renders as a `HTMLSpanElement` by default.
 * @property {string} [fontFamily]
 *    Sets the `fontFamily` CSS property.  You can use a theme-based value.
 * @property {string} [fontSize]
 *    Sets the `fontFamily` CSS property.  You can use a theme-based value.
 * @property {string} [fontStyle]
 *    Sets the `fontStyle` CSS property.
 * @property {string} [fontVariant]
 *    Sets the `fontVariant` CSS property.
 * @property {string} [fontWeight]
 *    Sets the `fontWeight` CSS property.  You can use a theme-based value.
 * @property {string} [letterSpacing]
 *    Sets the `letterSpacing` CSS property.  You can use a theme-based value.
 * @property {string} [lineHeight]
 *    Sets the `lineHeight` CSS property.  You can use a theme-based value.
 * @property {AnyProps} [styleProps]
 *    Style props are used by style functions provided in the `styles` prop.
 * @property {Styles} [styles]
 *    Style objects or style functions can be provided as a single value or in
 *    array-form for composition.
 * @property {string} [textAlign]
 *    Sets the `textAlign` CSS property.
 * @property {string} [textDecoration]
 *    Sets the `textDecoration` CSS property.
 * @property {string} [textOverflow]
 *    Sets the `textOverflow` CSS property.
 * @property {string} [textShadow]
 *    Sets the `textShadow` CSS property.  You can use a theme-based value.
 * @property {string} [textTransform]
 *    Sets the `textTransform` CSS property.
 * @property {string} [variant='']
 *    A text variant is a property path that accesses a style in
 *    `system.styles.typography.variants[variant]`.
 * @property {string} [whiteSpace]
 *    Sets the `whiteSpace` CSS property.
 * @property {string} [wordBreak]
 *    Sets the `wordBreak` CSS property.
 * @property {string} [wordSpacing]
 *    Sets the `wordSpacing` CSS property.
 */

/**
 * `Text` is a component primitive interoperating with the
 * `system.styles.typography` spec.
 *
 * It provides an easy way to render and apply text styles defined by the
 * system's typography rules, and convenient typography props to further
 * configure text styles.  Whenever possible, we recommend organizing text
 * styles in `system.styles.typography`.
 *
 * `Text` is composed from `Element`, and therefore inherits all properties and
 * configurations from `Element`.
 *
 * @param {AnyProps & TextProps} props
 * @returns {ReturnType<H>}
 */
const Text = (props) => {
  const {
    as = 'span',
    fontFamily,
    fontSize,
    fontStyle,
    fontVariant,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textDecoration,
    textOverflow,
    textShadow,
    textTransform,
    styleProps,
    styles,
    variant = '',
    whiteSpace,
    wordBreak,
    wordSpacing,
    ...restProps
  } = props;

  const style = filter((x) => x !== undefined)({
    fontFamily,
    fontSize,
    fontStyle,
    fontVariant,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textDecoration,
    textOverflow,
    textShadow,
    textTransform,
    whiteSpace,
    wordBreak,
    wordSpacing,
  });

  const variantStyle = useTypographyVariant(variant);

  return Element({
    ...restProps,
    as,
    styleProps,
    styles: mergeStyles([variantStyle, style, styles]),
  });
};

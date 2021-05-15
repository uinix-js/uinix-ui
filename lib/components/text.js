import {createElement} from 'react';

import {TEXT_VARIANT_KEY} from '../constants.js';
import {mergeStyles} from '../util/merge-styles.js';
import {Element} from './element.js';

export {Text};

/**
 * @typedef {{
 *   fontFamily?: string;
 *   fontSize?: string | number;
 *   fontStyle?: string;
 *   fontVariant?: string;
 *   fontWeight?: string;
 *   letterSpacing?: string | number;
 *   lineHeight?: string | number;
 *   textAlign?: string;
 *   textDecoration?: string;
 *   textOverflow?: string;
 *   textShadow?: string;
 *   textTransform?: string;
 *   whiteSpace?: string;
 *   wordBreak?: string;
 *   wordSpacing?: string;
 * } & import('./element.js').ElementProps} TextProps
 */

/**
 * `Text` is the primitive component used to apply typography styles as defined by the system.
 *
 * `Text` supports many typography shorthand props (e.g. `fontFamily`, `fontWeight`, `textAlign`) to easily apply typography styles defined by the system.  You may also apply styles using the `variant` prop.
 *
 * `Text` is composed from `Element`.
 *
 * @param {TextProps} props
 * @returns {import('react').ReactElement}
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
    variant,
    whiteSpace,
    wordBreak,
    wordSpacing,
    ...restProps
  } = props;

  const style = {
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
  };

  return createElement(Element, {
    ...restProps,
    as,
    styleProps,
    styles: mergeStyles([style, styles]),
    variant: `${TEXT_VARIANT_KEY}.${variant}`,
  });
};

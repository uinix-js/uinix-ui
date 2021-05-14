import {createElement} from 'react';

import {TEXT_VARIANT_KEY} from '../constants.js';
import {mergeStyles} from '../util/merge-styles.js';
import {Element} from './element.js';

export {Text};

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

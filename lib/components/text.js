import {createElement} from 'react';

import {Element} from './element.js';

export {Text};

const Text = ({
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
}) => {
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
    styles: [style, styles].flat(),
    variant: `Text.${variant}`,
  });
};

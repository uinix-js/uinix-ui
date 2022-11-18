import {filterEntries} from 'uinix-fp';

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
    whiteSpace,
    wordBreak,
    wordSpacing,
    ...restProps
  } = props;

  const style = filterEntries(([_k, v]) => v !== undefined)({
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

  return Element({
    ...restProps,
    as,
    styleProps,
    styles: [style, styles],
  });
};

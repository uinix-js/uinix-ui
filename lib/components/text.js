import {filterStyle} from '../util/filter-style.js';
import {Element} from './element.js';

export const Text = (props) => {
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

  const style = filterStyle({
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
    styles: [style, styles],
    styleProps,
  });
};

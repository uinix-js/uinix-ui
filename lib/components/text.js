import {filterEntries} from 'uinix-fp';

import {useTypographyVariant} from '../system/hooks.js';
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
    variant = '',
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

  const variantStyle = useTypographyVariant(variant);

  return Element({
    ...restProps,
    as,
    styleProps,
    styles: mergeStyles([variantStyle, style, styles]),
  });
};

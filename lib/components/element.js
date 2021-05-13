import {createElement} from 'react';
import {i} from 'uinix-fp';

import {useCss, useSystem, useVariant} from '../context/hooks.js';
import {resolveShorthandProps} from '../util/resolve-shorthand-props.js';

export {Element};

const Element = ({
  as = 'div',
  className = '',
  styleProps,
  styles,
  variant = '',
  ...restProps
}) => {
  const css = useCss(styleProps);
  const system = useSystem();
  const variantStyle = useVariant(variant);

  const {nonShorthandProps, shorthandPropsStyle} = resolveShorthandProps(
    system.options.shorthandPropsMapping,
  )(restProps);

  const mergedStyles = [variantStyle, shorthandPropsStyle, styles].flat();
  const mergedClassNames =
    [css(mergedStyles), className].filter(i).join(' ') || undefined;

  return createElement(as, {...nonShorthandProps, className: mergedClassNames});
};

import {props as p} from 'uinix-fp';

import {getStore} from '../system/store.js';
import {mergeClassNames} from '../util/merge-class-names.js';
import {resolveShorthandProps} from '../util/resolve-shorthand-props.js';

export const Element = (props) => {
  const {
    as = 'div',
    children,
    className = '',
    styles,
    styleProps,
    styleVariant = '',
    ...restProps
  } = props;

  const store = getStore();
  const {config, css, system} = store;
  const {createElement, elementShorthandPropsMapping, elementStyles} = config;

  const variantStyle = p(styleVariant)(system.styles);

  const [rest, shorthandStyle] = resolveShorthandProps(
    elementShorthandPropsMapping,
  )(restProps);

  const mergedStyles = [variantStyle, styles, shorthandStyle].flat(); // order matters
  const mergedClassNames = mergeClassNames([
    css(props)(elementStyles),
    css(styleProps)(mergedStyles),
    className,
  ]);

  const elementProps = {...rest, className: mergedClassNames};

  return typeof as === 'string'
    ? createElement(as, elementProps, children)
    : as(elementProps, children);
};

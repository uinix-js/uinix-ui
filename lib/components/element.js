import {createElement} from 'react';

import {useCss, useSystem, useVariant} from '../context/hooks.js';
import {mergeClassNames} from '../util/merge-class-names.js';
import {mergeStyles} from '../util/merge-styles.js';
import {resolveShorthandProps} from '../util/resolve-shorthand-props.js';

export {Element};

const Element = (props) => {
  const {
    as = 'div',
    className = '',
    styleProps,
    styles,
    variant = '',
    ...restProps
  } = props;

  const elementCss = useCss(props);
  const styleCss = useCss(styleProps);
  const system = useSystem();
  const variantStyle = useVariant(variant);
  const {element: elementOptions} = system.options;

  const {nonShorthandProps, shorthandPropsStyle} = resolveShorthandProps(
    elementOptions.shorthandPropsMapping,
  )(restProps);

  const mergedStyles = mergeStyles([variantStyle, shorthandPropsStyle, styles]);
  const mergedClassNames = mergeClassNames([
    elementCss(elementOptions.styles),
    styleCss(mergedStyles),
    className,
  ]);

  return createElement(as, {...nonShorthandProps, className: mergedClassNames});
};

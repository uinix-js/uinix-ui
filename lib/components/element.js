import {useConfig, useCss, useH, useVariant} from '../system/hooks.js';
import {mergeClassNames} from '../util/merge-class-names.js';
import {resolveShorthandProps} from '../util/resolve-shorthand-props.js';

export const Element = (props) => {
  const {
    as = 'div',
    children,
    className = '',
    styleProps,
    styles,
    variant = '',
    ...rest
  } = props;

  const config = useConfig();
  const elementCss = useCss(props);
  const styleCss = useCss(styleProps);
  const h = useH();
  const variantStyle = useVariant(variant);

  const {elementShorthandPropsMapping, elementStyles} = config;
  const [restProps, shorthandStyle] = resolveShorthandProps(
    elementShorthandPropsMapping,
  )(rest);

  const mergedStyles = [styles, shorthandStyle, variantStyle].flat();
  const mergedClassNames = mergeClassNames([
    elementCss(elementStyles),
    styleCss(mergedStyles),
    className,
  ]);

  const elementProps = {
    ...restProps,
    className: mergedClassNames,
  };

  return typeof as === 'string'
    ? h(as, elementProps, children)
    : as(elementProps, children);
};

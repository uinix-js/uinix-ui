import {useConfig, useCss, useH, useVariant} from '../system/hooks.js';
import {mergeClassNames} from '../util/merge-class-names.js';
import {mergeStyles} from '../util/merge-styles.js';
import {resolveShorthandProps} from '../util/resolve-shorthand-props.js';

export {Element};

const Element = (props) => {
  const {
    as = 'div',
    children,
    className = '',
    styleProps,
    styles,
    variant = '',
    ...restProps
  } = props;

  const config = useConfig();
  const elementCss = useCss(props);
  const styleCss = useCss(styleProps);
  const h = useH();
  const variantStyle = useVariant(variant);

  const {elementShorthandPropsMapping, elementStyles} = config;
  const {nonShorthandProps, shorthandPropsStyle} = resolveShorthandProps(
    elementShorthandPropsMapping,
  )(restProps);

  const mergedStyles = mergeStyles([styles, shorthandPropsStyle, variantStyle]);
  const mergedClassNames = mergeClassNames([
    elementCss(elementStyles),
    styleCss(mergedStyles),
    className,
  ]);

  const elementProps = {
    ...nonShorthandProps,
    className: mergedClassNames,
  };

  return typeof as === 'string'
    ? h(as, elementProps, children)
    : as(elementProps, children);
};

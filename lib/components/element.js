import {useCss, useH, useSystem, useVariant} from '../system/hooks.js';
import {mergeClassNames} from '../util/merge-class-names.js';
import {mergeStyles} from '../util/merge-styles.js';
import {resolveShorthandProps} from '../util/resolve-shorthand-props.js';

export {Element};

/**
 * @typedef {{
 *   [key: string]: any;
 *   as?: string;
 *   className?: string;
 *   styleProps?: import('../system/styles.js').StyleProps;
 *   styles?: import('../system/styles.js').OneOrManyStyle;
 *   variant?: string;
 * }} ElementProps
 */

/**
 * `Element` is the primitive building block for uinix component and interoperates with styles and themes defined by the system.
 *
 * It behaves essentially as a primitive `HTMLElement`, with easy configuration of styling features via a small and simple set of props.
 *
 * @param {ElementProps} props
 */
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

  const elementCss = useCss(props);
  const styleCss = useCss(styleProps);
  const h = useH();
  const system = useSystem();
  const variantStyle = useVariant(variant);

  const {elementShorthandPropsMapping, elementStyles} = system.config;
  const {nonShorthandProps, shorthandPropsStyle} = resolveShorthandProps(
    elementShorthandPropsMapping,
  )(restProps);

  const mergedStyles = mergeStyles([styles, shorthandPropsStyle, variantStyle]);
  const mergedClassNames = mergeClassNames([
    elementCss(elementStyles),
    styleCss(mergedStyles),
    className,
  ]);

  return h(as, {...nonShorthandProps, className: mergedClassNames}, children);
};

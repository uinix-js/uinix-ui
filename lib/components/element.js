export { Element };

import { createElement } from 'react';

import {
  useComponentStyles,
  useCss,
  useOptions,
  useVariant,
} from '../context/hooks.js';
import { resolveShorthandStyle } from '../styles/resolve-shorthand-style.js';
import { coerceStyles } from '../util/coerce-styles.js';
import { resolveClassName } from '../util/resolve-class-name.js';
import { resolveDomProps } from '../util/resolve-dom-props.js';

const Element = (props) => {
  const {
    as = 'div',
    children,
    className = '',
    variant = '',
    // styles
    styles,
    styleProps,
    ...restProps
  } = props;

  const css = useCss(styleProps);
  const componentStyles = useComponentStyles('Element', props);
  const variantStyle = useVariant(variant);
  const options = useOptions();

  const shorthandStyle = resolveShorthandStyle(
    props,
    options.shorthandStyleMapping,
  );

  return createElement(
    as,
    {
      ...resolveDomProps(restProps),
      className: resolveClassName(
        css(
          ...componentStyles,
          shorthandStyle,
          variantStyle,
          ...coerceStyles(styles),
        ),
        className,
      ),
    },
    children,
  );
};

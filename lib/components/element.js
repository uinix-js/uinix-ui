export {Element};

import {createElement} from 'react';

import {
  useCss,
  useOptions,
  useVariant,
} from '../context/hooks.js';
import {resolveShorthandStyle} from '../styles/resolve-shorthand-style.js';
import {coerceStyles} from '../util/coerce-styles.js';
import {resolveClassName} from '../util/resolve-class-name.js';
import {resolveDomProps} from '../util/resolve-dom-props.js';

const Element = (props) => {
  const {
    as = 'div',
    children,
    className = '',
    variant = '',
    // Styles
    styles,
    styleProps,
    ...restProps
  } = props;

  const css = useCss(styleProps);
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
          variantStyle,
          shorthandStyle,
          ...coerceStyles(styles),
        ),
        className,
      ),
    },
    children,
  );
};

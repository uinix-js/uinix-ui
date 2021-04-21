export { Element };

import { createElement } from 'react';

import { useComponentStyles, useCss, useOptions } from '../context/hooks.js';
import { createStyleShorthands } from '../styles/create-style-shorthands.js';
import { coerceStyles } from '../util/coerce-styles.js';
import { resolveClassName } from '../util/resolve-class-name.js';
import { resolveDomProps } from '../util/resolve-dom-props.js';

const Element = (props) => {
  const {
    as = 'div',
    children,
    className = '',
    // styles
    styles,
    styleProps,
    ...restProps
  } = props;

  const css = useCss(styleProps);
  const componentStyles = useComponentStyles('Element', props);
  const options = useOptions();

  const stylePropsStyle = createStyleShorthands(
    props,
    options.styleShorthandsMapping,
  );

  return createElement(
    as,
    {
      ...resolveDomProps(restProps),
      className: resolveClassName(
        css(stylePropsStyle, ...componentStyles, ...coerceStyles(styles)),
        className,
      ),
    },
    children,
  );
};

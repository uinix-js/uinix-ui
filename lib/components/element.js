export { Element };

import { createElement as e } from 'react';

import { useComponentStyles, useCss } from '../context/hooks.js';
import { shorthandStyleRule } from '../styles/shorthand-style-rule.js';
import { resolveClassName } from '../util/resolve-class-name.js';
import { resolveDomProps } from '../util/resolve-dom-props.js';

const Element = (props) => {
  const {
    as = 'div',
    children,
    className = '',
    styleRules = [],
    ...restProps
  } = props;

  const css = useCss(props);
  const componentStyles = useComponentStyles(props);

  return e(
    as,
    {
      ...resolveDomProps(restProps),
      className: resolveClassName(
        css(shorthandStyleRule, componentStyles.Element, ...styleRules),
        className,
      ),
    },
    children,
  );
};

export { Element };

import { createElement as e } from 'react';

import { useStyles } from '../context/hooks.js';
import { shorthandStyle } from '../styles/shorthand-style.js';
import { themedStyle } from '../styles/themed-style.js';
import { resolveClassName } from '../util/resolve-class-name.js';
import { resolveDomProps } from '../util/resolve-dom-props.js';

const Element = (props) => {
  const {
    as = 'div',
    children,
    className = '',
    styles = [],
    ...restProps
  } = props;

  const { css, styles: defaultStyles } = useStyles(props);

  return e(
    as,
    {
      ...resolveDomProps(restProps),
      className: resolveClassName(
        css(shorthandStyle, themedStyle, defaultStyles.Element, ...styles),
        className,
      ),
    },
    children,
  );
};

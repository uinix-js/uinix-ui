export { Layout };

import { createElement as e } from 'react';

import { useStyles } from '../context/hooks.js';
import { layoutStyle } from '../styles/layout-style.js';
import { Element } from './element.js';

const Layout = (props) => {
  const { children, styles = [], ...restProps } = props;

  const { styles: defaultStyles } = useStyles(props);

  return e(
    Element,
    { ...restProps, styles: [layoutStyle, defaultStyles.Layout, ...styles] },
    children,
  );
};

export { Layout };

import { createElement as e } from 'react';

import { useComponentStyles } from '../context/hooks.js';
import { layoutStyle } from '../styles/layout-style.js';
import { Element } from './element.js';

const Layout = (props) => {
  const { children, styles = [], ...restProps } = props;

  const componentStyles = useComponentStyles(props);

  return e(
    Element,
    { ...restProps, styles: [layoutStyle, componentStyles.Layout, ...styles] },
    children,
  );
};

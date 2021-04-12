export { Layout };

import { createElement as e } from 'react';

import { useComponentStyles } from '../context/hooks.js';
import { layoutStyleRule } from '../styles/layout-style-rule.js';
import { Element } from './element.js';

const Layout = (props) => {
  const { children, styleRules = [], ...restProps } = props;

  const componentStyles = useComponentStyles(props);

  return e(
    Element,
    {
      ...restProps,
      styleRules: [layoutStyleRule, componentStyles.Layout, ...styleRules],
    },
    children,
  );
};

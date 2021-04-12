export { useComponentStyles, useCss, useIcon, useStyleRules, useTheme };

import { useContext } from 'react';
import { useFela } from 'react-fela';

import { Context } from './context.js';

const useComponentStyles = () => {
  const { styles } = useContext(Context);
  return styles.components;
};

const useCss = (props) => {
  const { css } = useFela(props);
  return css;
};

const useIcon = (icon) => {
  const { icons } = useContext(Context);
  return icons[icon];
};

const useStyleRules = () => {
  const { styles } = useContext(Context);
  return styles.rules;
};

const useTheme = (props) => {
  const { theme } = useFela(props);
  return theme;
};

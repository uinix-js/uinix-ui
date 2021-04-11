export { useComponentStyles, useCss, useIcon, useStyles, useTheme };

import { useContext } from 'react';
import { useFela } from 'react-fela';

import { Context } from './context.js';

const useComponentStyles = () => {
  const { componentStyles } = useContext(Context);
  return componentStyles;
};

const useCss = (props) => {
  const { css } = useFela(props);
  return css;
};

const useIcon = (icon) => {
  const { icons } = useContext(Context);
  return icons[icon];
};

const useStyles = () => {
  const { styles } = useContext(Context);
  return styles;
};

const useTheme = (props) => {
  const { theme } = useFela(props);
  return theme;
};

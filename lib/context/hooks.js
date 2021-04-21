export {
  useComponentStyles,
  useCss,
  useIcon,
  useOptions,
  useStyles,
  useTheme,
  useVariant,
};

import { useContext } from 'react';
import { useFela } from 'react-fela';
import { prop } from 'uinix-fp';

import { Context } from './context.js';

const useComponentStyles = (name, props) => {
  const { styles } = useContext(Context);
  const theme = useTheme();
  return styles.components[name].map((style) => style({ ...props, theme }));
};

const useCss = (props) => {
  const { css } = useFela(props);
  return css;
};

const useIcon = (icon) => {
  const { icons } = useContext(Context);
  return icons[icon];
};

const useOptions = () => {
  const { options } = useContext(Context);
  return options;
};

const useStyles = () => {
  const { styles } = useContext(Context);
  return styles.rules;
};

const useTheme = (props) => {
  const { theme } = useFela(props);
  return theme;
};

const useVariant = (variant) => {
  const { styles } = useContext(Context);
  return prop(variant)(styles.variants);
};

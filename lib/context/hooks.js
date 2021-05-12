export {
  useCss,
  useIcon,
  useOptions,
  useStyles,
  useTheme,
  useVariant,
};

import {useContext} from 'react';
import {useFela} from 'react-fela';
import {props} from 'uinix-fp';

import {Context} from './context.js';

const useCss = (props) => {
  const {css} = useFela(props);
  return css;
};

const useIcon = (icon) => {
  const {icons} = useContext(Context);
  return icons[icon];
};

const useOptions = () => {
  const {options} = useContext(Context);
  return options;
};

const useStyles = () => {
  const {styles} = useContext(Context);
  return styles.rules;
};

const useTheme = () => {
  const {theme} = useContext(Context);
  return theme;
};

const useVariant = (variant) => {
  const {styles} = useContext(Context);
  return props(variant)(styles.variants);
};

export { useIcon, useStyles, useTheme };

import { useContext } from 'react';
import { useFela } from 'react-fela';

import { Context } from './context.js';

const useIcon = (icon) => {
  const { icons } = useContext(Context);
  return icons[icon];
};

const useStyles = (props) => {
  const { css } = useFela(props);
  const { styles } = useContext(Context);
  return { css, styles };
};

const useTheme = (props) => {
  const { theme } = useFela(props);
  return theme;
};

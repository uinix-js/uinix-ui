import {useContext} from 'react';
import {useFela} from 'react-fela';
import {props} from 'uinix-fp';

import {Context} from '../context/context.js';

export {
  useCss,
  useIcon,
  useStyles,
  useSystem,
  useTheme,
  useTypographyVariant,
  useVariant,
};

const useCss = (props) => useFela(props).css;

const useIcon = (icon) => useSystem().icons[icon];

const useStyles = () => useSystem().styles;

const useSystem = () => useContext(Context);

const useTheme = () => useSystem().theme;

const useTypographyVariant = (variant) =>
  props(`typography.variants.${variant}`)(useSystem().styles);

const useVariant = (variant) =>
  props(`variants.${variant}`)(useSystem().styles);

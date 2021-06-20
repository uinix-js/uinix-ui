import {props} from 'uinix-fp';

import {getStore} from './load.js';

export {
  useCss,
  useH,
  useIcon,
  useStyles,
  useSystem,
  useTheme,
  useTypographyVariant,
  useVariant,
};

const useCss = (props) => getStore().css(props);

const useH = () => getStore().h;

const useIcon = (icon) => useSystem().icons[icon];

const useStyles = () => useSystem().styles;

const useSystem = () => getStore().system;

const useTheme = () => useSystem().theme;

const useTypographyVariant = (variant) =>
  props(`typography.variants.${variant}`)(useSystem().styles);

const useVariant = (variant) =>
  props(`variants.${variant}`)(useSystem().styles);

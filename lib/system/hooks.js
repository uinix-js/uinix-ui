import {props} from 'uinix-fp';

import {parseSvgElement} from '../util/parse-svg-element.js';
import {getStore} from './load.js';

export {
  useConfig,
  useCss,
  useH,
  useIcon,
  useStyles,
  useSystem,
  useTheme,
  useTypographyVariant,
  useVariant,
};

const useConfig = () => getStore().config;

const useCss = (props) => getStore().createCssRenderer(props);

const useH = () => getStore().h;

const useIcon = (icon) => {
  const {icons} = useSystem();
  const svg = props(icon)(icons);
  const h = useH();
  return parseSvgElement({h, svg});
};

const useStyles = () => useSystem().styles;

const useSystem = () => getStore().system;

const useTheme = (path = '') => {
  const {theme} = useSystem();
  return path ? props(path)(theme) : theme;
};

const useTypographyVariant = (variant) =>
  props(`typography.variants.${variant}`)(useSystem().styles);

const useVariant = (variant) =>
  props(`variants.${variant}`)(useSystem().styles);

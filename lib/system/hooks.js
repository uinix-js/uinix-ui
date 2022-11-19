import {props} from 'uinix-fp';

import {parseSvgElement} from '../util/parse-svg-element.js';
import {getStore} from './create-system.js';

export const useConfig = () => getStore().config;

export const useCss = (props) => getStore().css(props);

export const useH = () => getStore().h;

export const useIcon = (icon) => {
  const {icons} = useSystem();
  const svg = props(icon)(icons);
  const h = useH();
  return parseSvgElement(svg, {h});
};

export const useStyles = () => useSystem().styles;

export const useSystem = () => getStore().system;

export const useTheme = (path = '') => {
  const {theme} = useSystem();
  return path ? props(path)(theme) : theme;
};

export const useStyleVariant = (styleVariant) =>
  props(styleVariant)(useSystem().styles);

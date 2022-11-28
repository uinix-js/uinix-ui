import {props as p} from 'uinix-fp';

import {getStore} from '../system/store.js';
import {filterStyle} from '../util/filter-style.js';
import {parseSvgElement} from '../util/parse-svg-element.js';
import {Element} from './element.js';

export const Icon = (props) => {
  const {
    color = 'currentColor',
    height,
    icon = '',
    size,
    styles,
    styleProps,
    width,
    ...restProps
  } = props;

  const {config, system} = getStore();

  const {createElement} = config;

  const svg = p(icon)(system.icons);
  const svgElement = parseSvgElement(svg, {createElement});

  const style = filterStyle({
    color,
    display: 'inline-flex',
    flex: 'none',
    '> svg': {
      height: height ?? size,
      width: width ?? size,
    },
  });

  return Element({
    ...restProps,
    children: svgElement,
    styles: [style, styles],
    styleProps,
  });
};

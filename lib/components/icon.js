export { Icon };

import { createElement as e } from 'react';
import InlineSvg from 'react-inlinesvg';

import { useComponentStyles, useIcon } from '../context/hooks.js';
import { iconStyle } from '../styles/icon-style.js';
import { Element } from './element.js';

const Icon = (props) => {
  const { icon, styles = [], ...restProps } = props;

  const iconSvg = useIcon(icon);
  const componentStyles = useComponentStyles(props);

  let SvgElement;
  if (iconSvg) {
    SvgElement = e(InlineSvg, {
      height: '100%',
      src: iconSvg,
      title: icon,
      width: '100%',
    });
  } else {
    throw new Error(
      `Icon "${icon}" does not exist.  Please make sure it is specified in the "icons" Provider value.`,
    );
  }

  return e(
    Element,
    {
      ...restProps,
      as: props.onClick ? 'button' : 'div',
      styles: [iconStyle, ...componentStyles.Icon, ...styles],
    },
    SvgElement,
  );
};

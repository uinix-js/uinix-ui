export { Icon };

import { createElement as e } from 'react';
import InlineSvg from 'react-inlinesvg';

import { useIcon, useStyles } from '../context/hooks.js';
import { iconStyle } from '../styles/icon-style.js';
import { Element } from './element.js';

const Icon = (props) => {
  const { icon, styles = [], title, ...restProps } = props;

  const { styles: defaultStyles } = useStyles(props);
  const iconSvg = useIcon(icon);

  let SvgElement;
  if (iconSvg) {
    SvgElement = e(InlineSvg, {
      height: '100%',
      src: iconSvg,
      title: title || icon,
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
      'aria-labelledby': title,
      as: props.onClick ? 'button' : 'div',
      styles: [iconStyle, ...defaultStyles.Icon, ...styles],
    },
    SvgElement,
  );
};

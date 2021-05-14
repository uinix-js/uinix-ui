import {createElement} from 'react';
import InlineSvg from 'react-inlinesvg';

import {useIcon} from '../context/hooks.js';
import {mergeStyles} from '../util/merge-styles.js';
import {Element} from './element.js';

export {Icon};

const Icon = (props) => {
  const {
    color = 'currentColor',
    height,
    icon,
    size,
    styleProps,
    styles,
    width,
    onClick,
    ...restProps
  } = props;

  const iconSvg = useIcon(icon);

  let SvgElement;
  if (iconSvg) {
    SvgElement = createElement(InlineSvg, {
      height: '100%',
      src: iconSvg,
      width: '100%',
    });
  } else {
    throw new Error(
      `Icon "${icon}" does not exist.  Please make sure it is specified in the SystemProvider.`,
    );
  }

  const style = {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color,
    display: 'flex',
    flex: 'none',
    height: height || size,
    margin: 0,
    padding: 0,
    width: width || size,
  };

  return createElement(
    Element,
    {
      ...restProps,
      as: onClick ? 'button' : 'div',
      styleProps,
      styles: mergeStyles([style, styles]),
      onClick,
    },
    SvgElement,
  );
};

export {Icon, iconStyle};

import {createElement} from 'react';
import InlineSvg from 'react-inlinesvg';

import {useComponentStyles, useIcon} from '../context/hooks.js';
import {coerceStyles} from '../util/coerce-styles.js';
import {Element} from './element.js';

const Icon = (props) => {
  const {
    icon,
    title = icon,
    // Styles
    styles,
    styleProps,
    color,
    height,
    size,
    width,
    ...restProps
  } = props;

  const iconSvg = useIcon(icon);
  const componentStyles = useComponentStyles('Icon', props);

  let SvgElement;
  if (iconSvg) {
    SvgElement = createElement(InlineSvg, {
      height: '100%',
      src: iconSvg,
      width: '100%',
    });
  } else {
    throw new Error(
      `Icon "${icon}" does not exist.  Please make sure it is specified in the Provider.`,
    );
  }

  return createElement(
    Element,
    {
      ...restProps,
      as: props.onClick ? 'button' : 'div',
      styles: [iconStyle, ...componentStyles, ...coerceStyles(styles)],
      styleProps: {
        ...(styleProps || {}),
        color,
        height,
        size,
        width,
      },
      title,
    },
    SvgElement,
  );
};

const iconStyle = ({color, height, size, width}) => {
  return {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color: color || 'currentColor',
    display: 'flex',
    flex: 'none',
    height: height || size,
    margin: 0,
    padding: 0,
    width: width || size,
  };
};

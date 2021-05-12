import {createElement} from 'react';

import {resolveShorthandStyle} from '../styles/resolve-shorthand-style.js';
import {coerceStyles} from '../util/coerce-styles.js';
import {Element} from './element.js';

export {Text};

const Text = (props) => {
  const {
    as = 'span',
    variant,
    // Styles
    styles,
    styleProps,
    ...restProps
  } = props;

  const shorthandStyle = resolveShorthandStyle(
    props,
    textShorthandStyleMapping,
  );

  return createElement(Element, {
    ...restProps,
    as,
    styles: [shorthandStyle, ...coerceStyles(styles)],
    styleProps,
    variant: `Text.${variant}`,
  });
};

const textShorthandStyleMapping = {
  fontFamily: ['fontFamily'],
  fontSize: ['fontSize'],
  fontStyle: ['fontStyle'],
  fontVariant: ['fontVariant'],
  fontWeight: ['fontWeight'],
  letterSpacing: ['letterSpacing'],
  lineHeight: ['lineHeight'],
  textAlign: ['textAlign'],
  textDecoration: ['textDecoration'],
  textOverflow: ['textOverflow'],
  textShadow: ['textShadow'],
  textTransform: ['textTransform'],
  whiteSpace: ['whiteSpace'],
  wordBreak: ['wordBreak'],
  wordSpacing: ['wordSpacing'],
};

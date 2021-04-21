export { Text };

import { createElement } from 'react';

import { useComponentStyles } from '../context/hooks.js';
import { resolveShorthandStyle } from '../styles/resolve-shorthand-style.js';
import { coerceStyles } from '../util/coerce-styles.js';
import { Element } from './element.js';

const Text = (props) => {
  const {
    as,
    variant = as,
    // styles
    styles,
    styleProps,
    ...restProps
  } = props;

  const componentStyles = useComponentStyles('Text', props);

  const shorthandStyle = resolveShorthandStyle(
    props,
    textShorthandStyleMapping,
  );

  return createElement(Element, {
    ...restProps,
    as,
    styles: [...componentStyles, shorthandStyle, ...coerceStyles(styles)],
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

export { Text };

import { createElement } from 'react';

import { useComponentStyles } from '../context/hooks.js';
import { coerceStyles } from '../util/coerce-styles.js';
import { Element } from './element.js';

const Text = (props) => {
  const {
    as,
    variant,
    // styles
    styles,
    styleProps,
    ...restProps
  } = props;

  const componentStyles = useComponentStyles('Text', props);

  return createElement(Element, {
    ...restProps,
    as,
    styles: [...componentStyles, ...coerceStyles(styles)],
    styleProps,
    variant,
  });
};

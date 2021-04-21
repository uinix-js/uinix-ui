export { Text };

import { createElement } from 'react';

import { useComponentStyles } from '../context/hooks.js';
import { coerceStyles } from '../util/coerce-styles.js';
import { Element } from './element.js';

const Text = (props) => {
  const {
    as,
    // styles
    styles,
    styleProps,
    ...restProps
  } = props;

  const componentStyles = useComponentStyles('Text', props);

  return createElement(Element, {
    ...restProps,
    as,
    styles: [textStyle, ...componentStyles, ...coerceStyles(styles)],
    styleProps: {
      ...(styleProps || {}),
    },
  });
};

const textStyle = () => {
  return {
  };
};

import {createElement} from 'react';

import {mergeStyles} from '../util/merge-styles.js';
import {Element} from './element.js';

export {Layout};

const Layout = (props) => {
  const {
    align,
    alignSelf,
    direction,
    flex,
    inline,
    justify,
    justifySelf,
    spacing,
    styleProps,
    styles,
    wrap,
    wrapSpacing,
    ...restProps
  } = props;

  const style = {
    alignItems: align,
    alignSelf,
    display: inline ? 'inline-flex' : 'flex',
    flex,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    justifyContent: justify,
    justifySelf,
    marginTop: `-${wrap ? wrapSpacing : undefined}`,
    '> :not(:last-child)': {
      [direction === 'column' ? 'marginBottom' : 'marginRight']: spacing,
      marginTop: wrapSpacing,
    },
    '> :last-child': {
      marginTop: wrapSpacing,
    },
  };

  return createElement(Element, {
    ...restProps,
    styleProps,
    styles: mergeStyles([style, styles]),
  });
};

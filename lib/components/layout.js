import {filterEntries} from 'uinix-fp';

import {Element} from './element.js';

export const Layout = (props) => {
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

  const style = filterEntries(([_k, v]) => v !== undefined)({
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
  });

  return Element({
    ...restProps,
    styleProps,
    styles: [style, styles],
  });
};

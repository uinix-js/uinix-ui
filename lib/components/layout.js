import {filterStyle} from '../util/filter-style.js';
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
    styles,
    styleProps,
    wrap,
    wrapSpacing,
    ...restProps
  } = props;

  const style = filterStyle({
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
    styles: [style, styles],
    styleProps,
  });
};

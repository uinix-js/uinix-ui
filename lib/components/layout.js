export {Layout, layoutStyle};

import {createElement} from 'react';

import {coerceStyles} from '../util/coerce-styles.js';
import {Element} from './element.js';

const Layout = (props) => {
  const {
    children,
    // Styles
    styles,
    styleProps,
    align,
    alignSelf,
    direction,
    flex,
    inline,
    justify,
    justifySelf,
    spacing,
    wrapSpacing,
    wrap,
    ...restProps
  } = props;

  return createElement(
    Element,
    {
      ...restProps,
      styles: [layoutStyle, ...coerceStyles(styles)],
      styleProps: {
        ...(styleProps || {}),
        align,
        alignSelf,
        direction,
        flex,
        inline,
        justify,
        justifySelf,
        spacing,
        wrapSpacing,
        wrap,
      },
    },
    children,
  );
};

const layoutStyle = ({
  align,
  alignSelf,
  direction,
  flex,
  inline,
  justify,
  justifySelf,
  spacing,
  wrapSpacing,
  wrap,
}) => {
  const marginDirection =
    direction === 'column' ? 'marginBottom' : 'marginRight';
  const wrapSpacingValue = wrap ? wrapSpacing : undefined;

  return {
    alignItems: align,
    alignSelf,
    display: inline ? 'inline-flex' : 'flex',
    flex,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    justifyContent: justify,
    justifySelf,
    marginTop: `-${wrapSpacingValue}`,
    '> :not(:last-child)': {
      [marginDirection]: spacing,
      marginTop: wrapSpacing,
    },
    '> :last-child': {
      marginTop: wrapSpacing,
    },
  };
};

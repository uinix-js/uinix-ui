export { Layout, layoutStyle };

import { createElement } from 'react';

import { useComponentStyles } from '../context/hooks.js';
import { coerceStyles } from '../util/coerce-styles.js';
import { Element } from './element.js';

const Layout = (props) => {
  const {
    children,
    // styles
    styles,
    styleProps,
    align,
    direction,
    flex,
    inline,
    justify,
    spacing,
    wrapSpacing,
    wrap,
    ...restProps
  } = props;

  const componentStyles = useComponentStyles('Layout', props);

  return createElement(
    Element,
    {
      ...restProps,
      styleProps: {
        ...(styleProps || {}),
        align,
        direction,
        flex,
        inline,
        justify,
        spacing,
        wrapSpacing,
        wrap,
      },
      styles: [layoutStyle, ...componentStyles, ...coerceStyles(styles)],
    },
    children,
  );
};

const layoutStyle = ({
  align,
  direction,
  flex,
  inline,
  justify,
  spacing,
  wrapSpacing,
  wrap,
}) => {
  const marginDirection =
    direction === 'column' ? 'marginBottom' : 'marginRight';
  const wrapSpacingValue = wrap ? wrapSpacing : undefined;

  return {
    alignItems: align,
    display: inline ? 'inline-flex' : 'flex',
    flex,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    justifyContent: justify,
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

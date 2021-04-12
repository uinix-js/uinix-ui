export { layoutStyleRule };

const layoutStyleRule = (props) => {
  const {
    theme,
    align,
    direction,
    flex,
    inline,
    justify,
    spacing,
    wrapSpacing,
    wrap,
  } = props;

  const marginDirection =
    direction === 'column' ? 'marginBottom' : 'marginRight';
  const wrapSpacingValue = wrap ? theme.spacings[wrapSpacing] : undefined;

  return {
    alignItems: align,
    display: inline ? 'inline-flex' : 'flex',
    flex,
    flexDirection: direction,
    flexWrap: wrap ? 'wrap' : undefined,
    justifyContent: justify,
    marginTop: -wrapSpacingValue,
    '> :not(:last-child)': {
      [marginDirection]: spacing,
      marginTop: wrapSpacing,
    },
    '> :last-child': {
      marginTop: wrapSpacing,
    },
  };
};

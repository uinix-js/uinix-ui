export { createStyleShorthands };

const createStyleShorthands = (props, shorthandPropsMapping) => {
  const resolvedShorthandProps = {};
  Object.entries(shorthandPropsMapping).forEach(([cssProperty, propNames]) => {
    resolvedShorthandProps[cssProperty] = propNames.reduce(
      (acc, propName) => acc || props[propName],
      undefined,
    );
  });
  return resolvedShorthandProps;
};

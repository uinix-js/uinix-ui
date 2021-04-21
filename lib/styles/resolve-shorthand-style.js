export { resolveShorthandStyle };

const resolveShorthandStyle = (props, shorthandStyleMapping) => {
  const resolvedShorthandStyle = {};
  Object.entries(shorthandStyleMapping).forEach(([cssProperty, propNames]) => {
    const propValue = propNames.reduce(
      (acc, propName) => acc || props[propName],
      undefined,
    );
    if (propValue !== undefined) {
      resolvedShorthandStyle[cssProperty] = propValue;
    }
  });
  return resolvedShorthandStyle;
};

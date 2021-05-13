export {resolveShorthandProps};

const resolveShorthandProps = (shorthandPropsMapping) => (props) => {
  const shorthandPropSet = new Set(Object.values(shorthandPropsMapping).flat());

  const nonShorthandProps = Object.entries(props).reduce(
    (acc, [prop, value]) => {
      if (!shorthandPropSet.has(prop)) {
        acc[prop] = value;
      }

      return acc;
    },
    {},
  );

  const shorthandPropsStyle = {};
  Object.entries(shorthandPropsMapping).forEach(([cssProperty, propNames]) => {
    const propValue = propNames.reduce(
      (acc, propName) => acc || props[propName],
      undefined,
    );
    if (propValue !== undefined) {
      shorthandPropsStyle[cssProperty] = propValue;
    }
  });

  return {nonShorthandProps, shorthandPropsStyle};
};

export {resolveShorthandProps};

const resolveShorthandProps = (shorthandPropsMapping) => (props) => {
  const shorthandPropSet = new Set(Object.values(shorthandPropsMapping).flat());

  const initialNonShorthandProps = {};
  const nonShorthandProps = Object.entries(props).reduce(
    (acc, [prop, value]) => {
      if (!shorthandPropSet.has(prop)) {
        acc[prop] = value;
      }

      return acc;
    },
    initialNonShorthandProps,
  );

  const shorthandPropsStyle = {};
  for (const [cssProperty, propNames] of Object.entries(
    shorthandPropsMapping,
  )) {
    const propValue = propNames.reduce(
      (acc, propName) => acc || props[propName],
      undefined,
    );
    if (propValue !== undefined) {
      shorthandPropsStyle[cssProperty] = propValue;
    }
  }

  return {nonShorthandProps, shorthandPropsStyle};
};

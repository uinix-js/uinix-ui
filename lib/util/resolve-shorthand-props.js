export {resolveShorthandProps};

/**
 * @typedef {Object.<string, any>} Props Component props
 */

/**
 * Resolves component props into `shorthandPropsStyle` by creating a `StyleObject` via referencing prop values and assigning them to their corresponding CSS properties through the `ShorthandPropsMapping`.
 *
 * Also returns `nonShorthandProps`, which allows excluding shorthand props for downstream consumers.
 *
 * @param {import('../system/config.js').ShorthandPropsMapping} shorthandPropsMapping
 * @returns {(props: Props) => {
 *   nonShorthandProps: Props;
 *   shorthandPropsStyle: import('../system/styles.js').StyleObject;
 * }}
 */
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

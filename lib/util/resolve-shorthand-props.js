export {resolveShorthandProps};

/**
 * @typedef {import('../types.js').AnyProps} Props
 * @typedef {import('../types.js').ShorthandPropsMapping} ShorthandPropsMapping
 * @typedef {import('../types.js').StyleObject} StyleObject
 */

/**
 * Resolves provided `props` into an object containing
 * - shorthandPropsStyle: prop entries registered in `shorthandPropsMapping`
 * will be reduced into a StyleObject, assigning the prop value to the relating
 * CSS property name as defined in `shorthandPropsMapping`.
 * - nonShorthandProps: a filtered copy of `props` excluding prop entries that
 * are registered in `shorthandPropsMapping`.
 *
 * @param {ShorthandPropsMapping} shorthandPropsMapping
 * @returns {(props: Props) => {nonShorthandProps: Props, shorthandPropsStyle: StyleObject}}
 */
const resolveShorthandProps = (shorthandPropsMapping) => (props) => {
  const shorthandPropSet = new Set(Object.values(shorthandPropsMapping).flat());

  /** @type {Props} */
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

  /** @type {ShorthandPropsMapping} */
  const shorthandPropsStyle = {};
  Object.entries(shorthandPropsMapping).forEach(([cssProperty, propNames]) => {
    /** @type any */
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

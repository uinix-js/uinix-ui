/**
 * @typedef {import('../types.js').Props} Props
 * @typedef {import('../types.js').ShorthandPropsMapping} ShorthandPropsMapping
 * @typedef {import('../types.js').StyleObject} StyleObject
 */

/**
 * Resolves provided `props` into a tuple of [`restProps`, `shorthandStyle`]
 *
 * @param {ShorthandPropsMapping} shorthandPropsMapping
 * @returns {(props: Props) => [Props, StyleObject]}
 */

export const resolveShorthandProps = (shorthandPropsMapping) => (props) => {
  /** @type {Props} */
  const restProps = {};
  /** @type {StyleObject} */
  const shorthandStyle = {};

  // Filter rest `props` not registered in `shorthandPropsMapping`
  const shorthandPropSet = new Set(Object.values(shorthandPropsMapping).flat());
  for (const [prop, value] of Object.entries(props)) {
    if (!shorthandPropSet.has(prop)) {
      restProps[prop] = value;
    }
  }

  // Reduce prop values registered in `shorthandPropsMapping`
  for (const [cssProperty, propNames] of Object.entries(
    shorthandPropsMapping,
  )) {
    const propValue = propNames.reduce(
      (acc, propName) => acc ?? props[propName],
      undefined,
    );
    if (propValue !== undefined) {
      shorthandStyle[cssProperty] = propValue;
    }
  }

  return [restProps, shorthandStyle];
};

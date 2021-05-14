export {resolveShorthandProps};

/**
 * @typedef {import('react').Props} Props Component props
 * @typedef {import('../system/options.js').ShorthandPropsMapping} ShorthandPropsMapping
 * @typedef {import('../system/styles.js').Style} Style
 *
 * @typedef {{
 *   nonShorthandProps: Props;
 *   shorthandPropsStyle: Style;
 * }} ResolvedData
 */

/**
 * Resolves component props into `shorthandPropsStyle` by creating a style object referencing the CSS property associated with the prop name specified in `shorthandPropsMapping`.
 *
 * Also returns `nonShorthandProps` so that these shorthand props can be excluded in the provided props when consumed in downstream components.
 *
 * @param {ShorthandPropsMapping} shorthandPropsMapping
 * @returns {(props: Props) => ResolvedData}
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

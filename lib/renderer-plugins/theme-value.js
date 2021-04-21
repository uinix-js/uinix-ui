import { isPlainObject, prop } from 'uinix-fp';
import { themeSpec } from 'uinix-theme';

export { themeValue };

/**
 * based on the official fela-plugin-theme-value with the following differences:
 * - Uses a static themeMapping based on uinix-theme's themeSpec
 * - resolves negative theme values
 */
const themeValue = () => {
  return (style, _type, _renderer, props) =>
    resolveThemeValues(style, props.theme);
};

const resolveThemeValues = (style, theme = {}) => {
  const NEGATIVE_REGEXP = /^\s*-/;
  const themeMapping = createThemeMapping(themeSpec);

  Object.entries(style).forEach(([property, value]) => {
    const resolveThemeValue = themeMapping[property];
    if (resolveThemeValue && typeof value === 'string') {
      const isNegative = NEGATIVE_REGEXP.test(value);
      if (isNegative) {
        value = value.split(NEGATIVE_REGEXP)[1].trim();
      }
      const themeValue = prop(value)(resolveThemeValue(theme)) || value;
      style[property] = isNegative ? `-${themeValue}` : themeValue;
    } else if (isPlainObject(value)) {
      style[property] = resolveThemeValues(style[property], theme);
    }
  });
  return style;
};

const createThemeMapping = (themeSpec) => {
  return Object.entries(themeSpec).reduce(
    (acc, [themeProperty, cssProperties]) => {
      cssProperties.forEach((cssProperty) => {
        acc[cssProperty] = prop(themeProperty);
      });
      return acc;
    },
    {},
  );
};

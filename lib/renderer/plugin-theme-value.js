import {isPlainObject, props} from 'uinix-fp';
import {themeMapping} from 'uinix-theme';

export {themeValue};

/**
 * Based on the official fela-plugin-theme-value with some differences:
 * - Uses a static mapping based on uinix-theme's themeMapping
 * - resolves negative theme values
 *
 * See https://github.com/robinweser/fela/tree/master/packages/fela-plugin-theme-value
 */
const themeValue = () => (style, _type, _renderer, props) =>
  resolveThemeValues(style, props.theme);

const resolveThemeValues = (style, theme = {}) => {
  const NEGATIVE_REGEXP = /^\s*-/;
  const mapping = createThemeMapping(themeMapping);

  Object.entries(style).forEach(([property, value]) => {
    const resolveThemeValue = mapping[property];
    if (resolveThemeValue && typeof value === 'string') {
      const isNegative = NEGATIVE_REGEXP.test(value);
      if (isNegative) {
        value = value.split(NEGATIVE_REGEXP)[1].trim();
      }

      const themeValue = props(value)(resolveThemeValue(theme)) || value;
      style[property] = isNegative ? `-${themeValue}` : themeValue;
    } else if (isPlainObject(value)) {
      style[property] = resolveThemeValues(style[property], theme);
    }
  });
  return style;
};

const createThemeMapping = (themeMapping) => {
  return Object.entries(themeMapping).reduce(
    (acc, [themeProperty, cssProperties]) => {
      cssProperties.forEach((cssProperty) => {
        acc[cssProperty] = props(themeProperty);
      });
      return acc;
    },
    {},
  );
};

import {isPlainObject, props} from 'uinix-fp';
import {themeMapping} from 'uinix-theme';

export {themeValue};

/**
 * @typedef {import('uinix-theme').ThemeMapping} UinixThemeThemeMapping
 * @typedef {import('../types.js').AnyProps} AnyProps
 * @typedef {import('../types.js').StyleObject} StyleObject
 * @typedef {import('../types.js').SystemTheme} SystemTheme
 *
 * @callback Plugin
 *    Customized (fela) Plugin interface
 * @param {StyleObject} style
 *    A style object
 * @param {any} _type
 *    Unused
 * @param {any} _renderer
 *    Unused
 * @param {AnyProps} props
 *    Style props
 * @returns {StyleObject}
 */

/**
 * Fela plugin to handle theme values.
 *
 * Based on the official fela-plugin-theme-value with some differences:
 * - Uses a static mapping based on uinix-theme's themeMapping.
 * - resolves negative theme values.
 *
 * See https://github.com/robinweser/fela/tree/master/packages/fela-plugin-theme-value
 *
 * This method is a workaround and will be removed when the formal
 * `fela-plugin-theme-value` supports negative theme values.
 *
 * @returns {Plugin}
 */
const themeValue = () => (style, _type, _renderer, props) =>
  resolveThemeValues(style, props.theme);

/**
 * Resolves theme values in a style by referncing the `theme`.
 *
 * @param {StyleObject} style
 * @param {SystemTheme} theme
 * @returns {StyleObject}
 */
const resolveThemeValues = (style, theme) => {
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
      // @ts-ignore: we CAN access from IStyle
      style[property] = isNegative ? `-${themeValue}` : themeValue;
    } else if (isPlainObject(value)) {
      // @ts-ignore: we CAN access from IStyle
      style[property] = resolveThemeValues(style[property], theme);
    }
  });
  return style;
};

/**
 * Creates a theme mapping from a `UinixThemeThemeMapping`.
 *
 * The keys are CSS property names, and the values are callbacks that will
 * return the nested object based on the attached theme property.
 *
 * @param {UinixThemeThemeMapping} themeMapping
 * @returns {Object<string, (style: StyleObject) => StyleObject>}
 */
const createThemeMapping = (themeMapping) => {
  /** @type {Object<string, (style: StyleObject) => StyleObject>} */
  const initialAcc = {};
  return Object.entries(themeMapping).reduce(
    (acc, [themeProperty, cssProperties]) => {
      cssProperties.forEach((cssProperty) => {
        acc[cssProperty] = props(themeProperty);
      });
      return acc;
    },
    initialAcc,
  );
};

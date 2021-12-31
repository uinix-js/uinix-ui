import {isPlainObject, props} from 'uinix-fp';
import {defaultThemeSpec} from 'uinix-theme';

export {themeValue};
export {resolveThemeValues as _resolveThemeValues};

/**
 * @typedef {import('fela').IStyle} IStyle
 * @typedef {import('uinix-theme').ThemeSpec} UinixThemeThemeMapping
 * @typedef {import('../types.js').AnyProps} AnyProps
 * @typedef {import('../types.js').StyleObject} StyleObject
 * @typedef {import('../types.js').SystemTheme} SystemTheme
 *
 * @callback Plugin
 *    Customized (fela) Plugin interface
 * @param {IStyle} style
 *    A style object
 * @param {any} _type
 *    Unused
 * @param {any} _renderer
 *    Unused
 * @param {AnyProps} props
 *    Style props
 * @returns {IStyle}
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
 * @param {IStyle} style
 * @param {SystemTheme} theme
 * @returns {IStyle}
 */
const resolveThemeValues = (style, theme) => {
  const NEGATIVE_REGEXP = /^\s*-/;
  const mapping = createThemeMapping(defaultThemeSpec);

  for (let [property, styleValue] of Object.entries(style)) {
    const resolveThemeValue = mapping[property];
    if (resolveThemeValue) {
      const isNegative = NEGATIVE_REGEXP.test(styleValue);
      if (isNegative) {
        styleValue = String(styleValue).split(NEGATIVE_REGEXP)[1].trim();
      }

      const resolvedValue =
        props(String(styleValue))(theme ? resolveThemeValue(theme) : {}) ||
        styleValue;
      const isNumber = !Number.isNaN(Number(resolvedValue));
      // @ts-ignore: we CAN access from IStyle
      style[property] = isNegative
        ? isNumber
          ? -resolvedValue
          : `-${resolvedValue}`
        : resolvedValue;
    } else if (isPlainObject(styleValue)) {
      // @ts-ignore: we CAN access from IStyle
      style[property] = resolveThemeValues(style[property], theme);
    }
  }

  return style;
};

/**
 * Creates a theme mapping from a `UinixThemeThemeMapping`.
 *
 * The keys are CSS property names, and the values are callbacks that will
 * return the nested object based on the attached theme property.
 *
 * @param {UinixThemeThemeMapping} themeMapping
 * @returns {Object<string, (style: IStyle) => IStyle>}
 */
const createThemeMapping = (themeMapping) => {
  /** @type {Object<string, (style: IStyle) => IStyle>} */
  const initialAcc = {};
  return Object.entries(themeMapping).reduce(
    (acc, [themeProperty, cssProperties]) => {
      for (const cssProperty of cssProperties) {
        acc[cssProperty] = props(themeProperty);
      }

      return acc;
    },
    initialAcc,
  );
};

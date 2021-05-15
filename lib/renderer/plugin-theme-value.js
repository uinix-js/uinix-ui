import {isPlainObject, props} from 'uinix-fp';
import {themeMapping} from 'uinix-theme';

export {themeValue};

/**
 * TODO: import when formal types are made available
 *
 * @callback Plugin
 * @param {import('../system/styles.js').StyleObject} [style]
 * @param {any} [type]
 * @param {any} [renderer]
 * @param {{
 *  theme: import('uinix-theme/lib/create-theme.js').Theme;
 * }} [props] component props
 * @returns {() => import('../system/styles.js').StyleObject}
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
 * @type {Plugin}
 */
const themeValue = () => (style, _type, _renderer, props) =>
  resolveThemeValues(style, props.theme);

/**
 * Resolves the provided `StyleObject` against the `Theme`
 *
 * @param {import('../system/styles.js').StyleObject} style
 * @param {import('uinix-theme/lib/create-theme.js').Theme} theme
 * @returns {import('../system/styles.js').StyleObject}
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
      style[property] = isNegative ? `-${themeValue}` : themeValue;
    } else if (isPlainObject(value)) {
      style[property] = resolveThemeValues(style[property], theme);
    }
  });
  return style;
};

/**
 * Returns a mapping of CSS property to theme value resolvers.
 *
 * @param {import('uinix-theme/lib/theme-mapping.js').ThemeMapping} themeMapping
 * @returns {{
 *   [key: string]: (
 *     theme: import('uinix-theme/lib/create-theme.js').Theme
 *   ) => import('uinix-theme/lib/create-theme.js').ThemePropertyDefinition;
 * }} mapping of CSS properties with theme value resolvers
 */
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

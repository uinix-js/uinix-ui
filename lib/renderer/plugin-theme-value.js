import {isPlainObject, props} from 'uinix-fp';
import {defaultThemeSpec} from 'uinix-theme';

export {themeValue};
export {resolveThemeValues as _resolveThemeValues};

const themeValue = () => (style, _type, _renderer, props) =>
  resolveThemeValues(style, props.theme);

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
      style[property] = isNegative
        ? isNumber
          ? -resolvedValue
          : `-${resolvedValue}`
        : resolvedValue;
    } else if (isPlainObject(styleValue)) {
      style[property] = resolveThemeValues(style[property], theme);
    }
  }

  return style;
};

const createThemeMapping = (themeMapping) => {
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

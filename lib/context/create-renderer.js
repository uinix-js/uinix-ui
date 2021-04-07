export { createRenderer };

import { createRenderer as createFelaRenderer } from 'fela';
import enforceLonghands from 'fela-enforce-longhands';
import monolithic from 'fela-monolithic';
import responsiveValue from 'fela-plugin-responsive-value';
import themeValue from 'fela-plugin-theme-value';
import webPreset from 'fela-preset-web';
import { prop } from 'uinix-fp';
import { themeSpec } from 'uinix-theme';

const createRenderer = (theme, options) => {
  const { isAtomicCss } = options;
  const themeMapping = createThemeMapping(themeSpec);
  const responsiveAttributes = Object.keys(themeMapping).reduce(
    (acc, cssProperty) => {
      acc[cssProperty] = true;
      return acc;
    },
    {},
  );

  let enhancers = [enforceLonghands()];
  if (!isAtomicCss) {
    enhancers.push(monolithic());
  }

  const plugins = [
    // order matters
    responsiveValue(
      () => Object.values(theme.breakpoints),
      responsiveAttributes,
    ),
    themeValue(themeMapping),
    ...webPreset,
  ];

  const renderer = createFelaRenderer({ enhancers, plugins });

  renderStaticStyles(renderer, theme);

  return renderer;
};

const createThemeMapping = (themeSpec) => {
  return Object.entries(themeSpec).reduce((acc, [themeKey, cssProperties]) => {
    cssProperties.forEach((cssProperty) => {
      acc[cssProperty] = prop(themeKey);
    });
    return acc;
  }, {});
};

// TODO: https://github.com/robinweser/fela/issues/876
// specifically nested and pseudo selectors and responsiveValue does not work
const renderStaticStyles = (renderer, theme) => {
  Object.entries(theme.styles).forEach(([selector, style]) => {
    const staticStyle = renderer.plugins.reduce((_acc, plugin) => {
      return plugin(style, null, null, { theme });
    }, style);
    renderer.renderStatic(staticStyle, selector);
  });
};

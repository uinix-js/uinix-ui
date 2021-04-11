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
  const { globalStyles, isAtomicCss } = options;
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
      () =>
        Object.values(theme.breakpoints).map(
          (breakpoint) => `@media screen and (min-width: ${breakpoint})`,
        ),
      responsiveAttributes,
    ),
    themeValue(themeMapping),
    ...webPreset,
  ];

  const renderer = createFelaRenderer({ enhancers, plugins });

  renderGlobalStyles(renderer, globalStyles, theme);

  return renderer;
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

// TODO: https://github.com/robinweser/fela/issues/876
// specifically nested and pseudo selectors and responsiveValue does not work
const renderGlobalStyles = (renderer, globalStyles, theme) => {
  Object.entries(globalStyles).forEach(([selector, style]) => {
    const processedStyle = renderer.plugins.reduce((_acc, plugin) => {
      return plugin(style, null, null, { theme });
    }, style);
    renderer.renderStatic(processedStyle, selector);
  });
};

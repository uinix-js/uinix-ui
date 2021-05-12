export {createRenderer};

import {createRenderer as createFelaRenderer} from 'fela';
import enforceLonghands from 'fela-enforce-longhands';
import monolithic from 'fela-monolithic';
import responsiveValue from 'fela-plugin-responsive-value';
import webPreset from 'fela-preset-web';

import {themeValue} from './plugin-theme-value.js';

const createRenderer = ({
  globalStyles,
  isAtomicCss,
  responsiveAttributes,
  theme,
}) => {
  const enhancers = [enforceLonghands()];
  if (!isAtomicCss) {
    enhancers.push(monolithic());
  }

  // TODO: move this out of theme
  const {breakpoints = {}, fontFaces = {}} = theme;

  const plugins = [
    // Order matters
    responsiveValue(
      () =>
        Object.values(breakpoints).map(
          (breakpoint) => `@media screen and (min-width: ${breakpoint})`,
        ),
      responsiveAttributes.reduce((acc, attribute) => {
        acc[attribute] = true;
        return acc;
      }, {}),
    ),
    themeValue(),
    ...webPreset,
  ];

  const renderer = createFelaRenderer({enhancers, plugins});

  // Render font faces
  Object.entries(fontFaces).forEach(([fontFamily, fontFace]) => {
    const {files, ...fontProps} = fontFace;
    renderer.renderFont(fontFamily, files, fontProps);
  });

  // Render global styles
  renderGlobalStyles({globalStyles, renderer, theme});

  return renderer;
};

// TODO: https://github.com/robinweser/fela/issues/876
// specifically nested and pseudo selectors and responsiveValue does not work
const renderGlobalStyles = ({globalStyles, renderer, theme}) => {
  Object.entries(globalStyles).forEach(([selector, style]) => {
    const processedStyle = renderer.plugins.reduce((_acc, plugin) => {
      return plugin(style, null, null, {theme});
    }, style);
    renderer.renderStatic(processedStyle, selector);
  });
};

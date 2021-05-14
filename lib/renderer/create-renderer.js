import {createRenderer as createFelaRenderer} from 'fela/es/index.js';
import enforceLonghands from 'fela-enforce-longhands/es/index.js';
import monolithic from 'fela-monolithic/es/index.js';
import webPreset from 'fela-preset-web/es/index.js';

import {responsiveValue} from './plugin-responsive-value.js';
import {themeValue} from './plugin-theme-value.js';

export {createRenderer};

const createRenderer = (system) => {
  const {options, styles, theme} = system;
  const {isAtomicCss, responsiveAttributes, responsiveBreakpoints} =
    options.styles;

  // Create enhancers
  const enhancers = [enforceLonghands()];
  if (!isAtomicCss) {
    enhancers.push(monolithic());
  }

  // Create plugins (order matters)
  const plugins = [
    responsiveValue({responsiveAttributes, responsiveBreakpoints}),
    themeValue(),
    ...webPreset,
  ];

  // Create renderer and render font faces and global styles
  const renderer = createFelaRenderer({enhancers, plugins});
  renderFontFaces({fontFaces: styles.fontFaces, renderer});
  renderGlobalStyles({globalStyles: styles.global, renderer, theme});

  return renderer;
};

const renderFontFaces = ({fontFaces, renderer}) => {
  Object.entries(fontFaces).forEach(([fontFamily, fontFace]) => {
    const {src, ...fontProps} = fontFace;
    renderer.renderFont(fontFamily, src, fontProps);
  });
};

// TODO: workaround to https://github.com/robinweser/fela/issues/876
// nested/pseudo selectors and responsiveValue do not work
const renderGlobalStyles = ({globalStyles, renderer, theme}) => {
  Object.entries(globalStyles).forEach(([selector, style]) => {
    const processedStyle = renderer.plugins.reduce(
      (_acc, plugin) => plugin(style, null, null, {theme}),
      style,
    );
    renderer.renderStatic(processedStyle, selector);
  });
};

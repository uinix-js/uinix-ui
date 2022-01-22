import {createRenderer as createFelaRenderer} from 'fela';
import enforceLonghands from 'fela-enforce-longhands';
import monolithic from 'fela-monolithic';
import webPreset from 'fela-preset-web';
import {merge} from 'uinix-fp';

import {responsiveValue} from './plugin-responsive-value.js';
import {themeValue} from './plugin-theme-value.js';

export {createRenderer};

const createRenderer = (system, config) => {
  const {styles, theme} = system;
  const {enableAtomicCss, responsiveCssProperties} = config;
  const {breakpoints, typography} = styles;
  const {fontFaces} = typography;
  const globalStyles = merge(styles.global)(typography.global);

  // Create enhancers
  const enhancers = [enforceLonghands()];
  if (!enableAtomicCss) {
    enhancers.push(monolithic());
  }

  // Create plugins (order matters)
  const plugins = [
    responsiveValue({breakpoints, responsiveCssProperties}),
    themeValue(),
    ...webPreset,
  ];

  // Create renderer and render font faces and global styles
  const renderer = createFelaRenderer({enhancers, plugins});
  renderFontFaces({fontFaces, renderer});
  renderGlobalStyles({globalStyles, renderer, theme});

  return renderer;
};

const renderFontFaces = (props) => {
  const {fontFaces, renderer} = props;
  for (const [fontFamily, fontFace] of Object.entries(fontFaces)) {
    const {src, ...fontProps} = fontFace;
    renderer.renderFont(fontFamily, src, fontProps);
  }
};

const renderGlobalStyles = ({globalStyles, renderer, theme}) => {
  for (const [selector, style] of Object.entries(globalStyles)) {
    let plugins = [];
    plugins = renderer.plugins;

    const processedStyle = plugins.reduce(
      (_acc, plugin) => plugin(style, 'STATIC', renderer, {theme}),
      style,
    );
    renderer.renderStatic(processedStyle, selector);
  }
};

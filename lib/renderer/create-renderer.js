import {createRenderer as createFelaRenderer} from 'fela';
// @ts-ignore: formal types unavailable
import enforceLonghands from 'fela-enforce-longhands';
import monolithic from 'fela-monolithic';
import webPreset from 'fela-preset-web';
import {merge} from 'uinix-fp';

import {responsiveValue} from './plugin-responsive-value.js';
import {themeValue} from './plugin-theme-value.js';

export {createRenderer};

/**
 * @typedef {import('fela').TPlugin} Plugin
 * @typedef {import('fela').IRenderer} Renderer
 * @typedef {import('fela').IStyle} IStyle
 * @typedef {import('../types.js').AnyProps} AnyProps
 * @typedef {import('../types.js').Config} Config
 * @typedef {import('../types.js').StyleDefinition} StyleDefinition
 * @typedef {import('../types.js').System} System
 * @typedef {import('../types.js').SystemTheme} SystemTheme
 */

/**
 * Creates a Fela CSS renderer based on the system and configuration.
 *
 * @param {System} system
 * @param {Config} config
 * @returns {Renderer}
 */
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

/**
 * Render fonts with the renderer.
 *
 * @param {AnyProps} props
 * @returns {void}
 */
const renderFontFaces = (props) => {
  const {fontFaces, renderer} = props;
  Object.entries(fontFaces).forEach(([fontFamily, fontFace]) => {
    const {src, ...fontProps} = fontFace;
    renderer.renderFont(fontFamily, src, fontProps);
  });
};

/**
 * Render fonts with the renderer.
 *
 * This method is a workaround and will be removed when
 * https://github.com/uinix-js/uinix-ui/issues/6 is addressed.
 *
 * @param {object} options
 * @param {StyleDefinition} options.globalStyles
 * @param {Renderer} options.renderer
 * @param {SystemTheme} options.theme
 * @returns {void}
 */
const renderGlobalStyles = ({globalStyles, renderer, theme}) => {
  Object.entries(globalStyles).forEach(([selector, style]) => {
    /** @type {Plugin[]} */
    let plugins = [];
    // @ts-ignore: workaround to access renderer internals
    plugins = renderer.plugins;

    const processedStyle = plugins.reduce(
      // @ts-ignore
      (_acc, plugin) => plugin(style, 'STATIC', renderer, {theme}),
      style,
    );
    // @ts-ignore
    renderer.renderStatic(processedStyle, selector);
  });
};

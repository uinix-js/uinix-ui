import {createRenderer as createFelaRenderer} from 'fela';
import enforceLonghands from 'fela-enforce-longhands';
import monolithic from 'fela-monolithic';
import webPreset from 'fela-preset-web';
import {merge} from 'uinix-fp';

import {responsiveValue} from './plugin-responsive-value.js';
import {themeValue} from './plugin-theme-value.js';

export {createRenderer};

/**
 * @typedef {any} Renderer a Fela renderer (no official typings available right now).
 */

/**
 * Creates a (Fela) renderer to render styles/CSS.
 *
 * @param {import('../system/index.js').System} system
 * @returns {Renderer}
 */
const createRenderer = (system) => {
  const {config, styles, theme} = system;
  const {isAtomicCss, responsiveCssProperties} = config;
  const {breakpoints, typography} = styles;
  const {fontFaces} = typography;
  const globalStyles = merge(styles.global)(typography.global);

  // Create enhancers
  const enhancers = [enforceLonghands()];
  if (!isAtomicCss) {
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
 * Renders font faces.
 *
 * @param {object} props
 * @param {import('../system/styles.js').FontFaces} props.fontFaces
 * @param {Renderer} props.renderer
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
 * Renders the global styles.
 *
 * TODO (workarounds):
 * - https://github.com/robinweser/fela/issues/876
 * - nested/pseudo selectors and responsiveValue do not work
 *
 * @param {object} props
 * @param {Object.<string, import('../system/styles.js').StyleObject>} props.globalStyles
 * @param {Renderer} props.renderer
 * @param {import('uinix-theme/lib/create-theme.js').Theme} props.theme
 * @returns {void}
 */
const renderGlobalStyles = ({globalStyles, renderer, theme}) => {
  Object.entries(globalStyles).forEach(([selector, style]) => {
    const processedStyle = renderer.plugins.reduce(
      (_acc, plugin) => plugin(style, null, null, {theme}),
      style,
    );
    renderer.renderStatic(processedStyle, selector);
  });
};

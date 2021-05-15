import {createRenderer as createFelaRenderer} from 'fela/es/index.js';
import enforceLonghands from 'fela-enforce-longhands/es/index.js';
import monolithic from 'fela-monolithic/es/index.js';
import webPreset from 'fela-preset-web/es/index.js';

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
  const {options, styles, theme} = system;
  const {isAtomicCss, responsiveBreakpoints, responsiveCssProperties} =
    options.styles;

  // Create enhancers
  const enhancers = [enforceLonghands()];
  if (!isAtomicCss) {
    enhancers.push(monolithic());
  }

  // Create plugins (order matters)
  const plugins = [
    responsiveValue({responsiveBreakpoints, responsiveCssProperties}),
    themeValue(),
    ...webPreset,
  ];

  // Create renderer and render font faces and global styles
  const renderer = createFelaRenderer({enhancers, plugins});
  renderFontFaces({styles, renderer});
  renderGlobalStyles({renderer, styles, theme});

  return renderer;
};

/**
 * Renders font faces.
 *
 * @param {object} props
 * @param {import('../system/styles.js').Styles} props.styles
 * @param {Renderer} props.renderer
 * @returns {void}
 */
const renderFontFaces = (props) => {
  const {renderer, styles} = props;
  Object.entries(styles.fontFaces).forEach(([fontFamily, fontFace]) => {
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
 * @param {Renderer} props.renderer
 * @param {import('../system/styles.js').Styles} props.styles
 * @param {import('uinix-theme/lib/create-theme.js').Theme} props.theme
 * @returns {void}
 */
const renderGlobalStyles = ({renderer, styles, theme}) => {
  Object.entries(styles.global).forEach(([selector, style]) => {
    const processedStyle = renderer.plugins.reduce(
      (_acc, plugin) => plugin(style, null, null, {theme}),
      style,
    );
    renderer.renderStatic(processedStyle, selector);
  });
};

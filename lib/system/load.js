import {merge} from 'uinix-fp';
import {combineStyles, createThemeRenderer} from 'uinix-theme';

import {createSystem} from './create.js';

export {load, getStore};

let store;

const getStore = () => store;

const defaultConfig = {
  elementShorthandPropsMapping: {},
  elementStyles: [],
  enableAtomicCss: false,
  enableCssVariables: false,
  namespace: null,
  responsiveBreakpoints: [],
  responsiveCssProperties: [],
};

const load = ({
  config: initialConfig = defaultConfig,
  h,
  system: initialSystem,
}) => {
  const config = merge(defaultConfig)(initialConfig);
  const system = createSystem(initialSystem);

  // TODO: refactor API entry points
  const options = {
    enableAtomicCss: config.enableAtomicCss,
    enableCssVariables: config.enableCssVariables,
    namespace: config.namespace,
    responsiveBreakpoints: config.responsiveBreakpoints,
    responsiveCssProperties: config.responsiveCssProperties,
    theme: system.theme,
    themeSpec: system.themeSpec,
  };

  const renderer = createThemeRenderer(options);

  renderer.renderStaticStyles(system.styles.static);

  const css =
    (props = {}) =>
    (rules) =>
      renderer.renderStyle(combineStyles(rules), props);

  if (typeof window !== 'undefined') {
    renderer.render();
  }

  store = {
    config,
    css,
    h,
    system,
  };

  return renderer.clear;
};

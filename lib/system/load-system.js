import {merge} from 'uinix-fp';
import {combineStyles, createThemeRenderer} from 'uinix-theme';

import {createSystem} from './create-system.js';

let store;

export const getStore = () => store;

const defaultConfig = {
  elementShorthandPropsMapping: {},
  elementStyles: [],
  enableAtomicCss: false,
  enableCssVariables: false,
  namespace: '',
  responsiveBreakpoints: [],
  responsiveCssProperties: [],
};

export const loadSystem = ({
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

  renderer.renderGlobalStyles(system.styles.global);

  const css =
    (props = {}) =>
    (rules) =>
      renderer.renderStyle(combineStyles(rules), props);

  if (typeof window !== 'undefined') {
    renderer.load();
  }

  store = {
    config,
    css,
    h,
    system,
  };

  return renderer.unload;
};

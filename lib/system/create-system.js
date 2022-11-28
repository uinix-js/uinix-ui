import {merge} from 'uinix-fp';
import {combineStyles, createThemeRenderer} from 'uinix-theme';

import {setStore} from './store.js';

export const createSystem = (
  initialSystem = defaultSystem,
  initialConfig = defaultConfig,
) => {
  const system = merge(defaultSystem)(initialSystem);
  const config = merge(defaultConfig)(initialConfig);

  const themeRendererOptions = {
    enableAtomicCss: config.enableAtomicCss,
    enableCssVariables: config.enableCssVariables,
    namespace: config.namespace,
    responsiveBreakpoints: config.responsiveBreakpoints,
    responsiveCssProperties: config.responsiveCssProperties,
    theme: system.theme,
    themeSpec: system.themeSpec,
  };

  const renderer = createThemeRenderer(themeRendererOptions);

  renderer.renderGlobalStyles(system.globalStyles);

  const css =
    (props = {}) =>
    (rules) =>
      renderer.renderStyle(combineStyles(rules), props);

  renderer.load();

  setStore({config, css, system});

  return renderer.unload;
};

const defaultConfig = {
  createElement: null,
  elementShorthandPropsMapping: {},
  elementStyles: [],
  enableAtomicCss: false,
  enableCssVariables: false,
  namespace: '',
  responsiveBreakpoints: [],
  responsiveCssProperties: [],
};

const defaultSystem = {
  icons: {},
  globalStyles: {},
  styles: {},
  theme: {},
  themeSpec: {},
};

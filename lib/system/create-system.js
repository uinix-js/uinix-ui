import {merge} from 'uinix-fp';
import {combineStyles, createThemeRenderer} from 'uinix-theme';

let store;

export const getStore = () => store;

export const createSystem = (initialSystem) => {
  const system = coerceSystem(initialSystem);
  const {config} = system;

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

  if (typeof window !== 'undefined') {
    renderer.load();
  }

  store = {
    config,
    css,
    h: config.createElement,
    system,
  };

  return renderer.unload;
};

const coerceSystem = (system = defaultSystem) => {
  return merge(defaultSystem)({
    ...system,
    theme: createTheme(system.theme, system.themeSpec),
  });
};

const defaultSystem = {
  config: {
    createElement: null,
    elementShorthandPropsMapping: {},
    elementStyles: [],
    enableAtomicCss: false,
    enableCssVariables: false,
    namespace: '',
    responsiveBreakpoints: [],
    responsiveCssProperties: [],
  },
  icons: {},
  globalStyles: {},
  styles: {},
  theme: {},
  themeSpec: {},
};

const createTheme = (theme, themeSpec) =>
  // @ts-ignore (insufficient TS-inference)
  Object.fromEntries(
    Object.keys(themeSpec ?? {}).map((themeProperty) => [
      themeProperty,
      (theme && theme[themeProperty]) ?? {},
    ]),
  );

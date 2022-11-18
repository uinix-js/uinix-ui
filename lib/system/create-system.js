import {merge} from 'uinix-fp';
import {combineStyles, createThemeRenderer} from 'uinix-theme';

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

export const createSystem = ({
  config: initialConfig = defaultConfig,
  h,
  system: initialSystem,
}) => {
  const config = merge(defaultConfig)(initialConfig);
  const system = coerceSystem(initialSystem);

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

const coerceSystem = (system = defaultSystem) => {
  return merge(defaultSystem)({
    ...system,
    theme: createTheme(system.theme, system.themeSpec),
  });
};

const defaultSystem = {
  icons: {},
  styles: {
    global: {},
    rules: {},
    variants: {},
  },
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

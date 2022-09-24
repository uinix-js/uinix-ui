import {merge} from 'uinix-fp';
import {combineStyles, createThemeRenderer} from 'uinix-theme';
import defaultThemeSpec from 'uinix-theme-spec';

import {createConfig, createSystem} from './create.js';

export {load, getStore};

let store;

const getStore = () => store;

const load = ({config: providedConfig, h, system: providedSystem}) => {
  const config = createConfig(providedConfig);
  const system = createSystem(providedSystem);

  // TODO: refactor API entry points
  const options = {
    enableAtomicCss: config.enableAtomicCss,
    enableCssVariables: config.enableCssVariables,
    namespace: config.namespace,
    responsiveBreakpoints: system.styles.breakpoints,
    responsiveCssProperties: config.responsiveCssProperties,
    theme: system.theme,
    themeSpec: defaultThemeSpec,
  };

  const staticStyles = merge(system.styles.global)(
    system.styles.typography.global,
  );

  const renderer = createThemeRenderer(options);

  renderer.renderStaticStyles(staticStyles);

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

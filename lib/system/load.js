import {merge} from 'uinix-fp';
import {
  combineStyles,
  createThemeRenderer,
  defaultThemeSpec,
} from 'uinix-theme';

import {createConfig, createSystem} from './create.js';

export {load, getStore};

let store;

const getStore = () => store;

const load = ({config: providedConfig, h, system: providedSystem}) => {
  const config = createConfig(providedConfig);
  const system = createSystem(providedSystem);

  // TODO: refactor API entry points
  const options = {
    ...config,
    responsiveBreakpoints: system.styles.breakpoints,
    theme: system.theme,
    themeSpec: defaultThemeSpec,
  };

  const staticStyles = merge(system.styles.global)(
    system.styles.typography.global,
  );

  const renderer = createThemeRenderer(options);

  renderer.renderStaticStyles(staticStyles);

  const createCssRenderer =
    (props = {}) =>
    (rules) =>
      renderer.renderStyle(combineStyles(rules), props);

  if (typeof window !== 'undefined') {
    renderer.render();
  }

  store = {
    config,
    createCssRenderer,
    h,
    system,
  };
};

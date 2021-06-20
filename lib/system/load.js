import {combineRules} from 'fela';
import {render} from 'fela-dom';

import {createRenderer} from '../renderer/create-renderer.js';
import {createConfig, createSystem} from './create.js';

export {load, getStore};

let store;

const getStore = () => store;

const load = (h, providedSystem, providedConfig) => {
  const config = createConfig(providedConfig);
  const system = createSystem(providedSystem);
  const renderer = createRenderer(system, config);

  const css =
    (props = {}) =>
    (...rules) =>
      renderer.renderRule(combineRules(...rules), {
        ...props,
        theme: system.theme,
      });

  render(renderer);

  store = {
    config,
    css,
    h,
    system,
  };
};

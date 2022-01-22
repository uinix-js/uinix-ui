import {combineRules} from 'fela';
import {render} from 'fela-dom';

import {createRenderer} from '../renderer/create-renderer.js';
import {createConfig, createSystem} from './create.js';

export {load, getStore};

let store;

const getStore = () => store;

const load = ({config: providedConfig, h, system: providedSystem}) => {
  const config = createConfig(providedConfig);
  const system = createSystem(providedSystem);
  const renderer = createRenderer(system, config);

  const createCssRenderer =
    (props = {}) =>
    (...rules) =>
      renderer.renderRule(combineRules(...rules), {
        ...props,
        theme: system.theme,
      });

  if (typeof window !== 'undefined') {
    render(renderer);
  }

  store = {
    config,
    createCssRenderer,
    h,
    system,
  };
};

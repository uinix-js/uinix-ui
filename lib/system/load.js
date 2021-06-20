import {combineRules} from 'fela';
import {render} from 'fela-dom';

import {createRenderer} from '../renderer/create-renderer.js';
import {createSystem} from './create.js';

export {load, getStore};

let store;

const getStore = () => store;

const load = (h, providedSystem) => {
  const system = createSystem(providedSystem);
  const renderer = createRenderer(system);
  const css =
    (props = {}) =>
    (...rules) =>
      renderer.renderRule(combineRules(...rules), {
        ...props,
        theme: system.theme,
      });

  render(renderer);

  store = {css, h, system};
};

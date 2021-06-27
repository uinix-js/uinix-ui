import {combineRules} from 'fela';
import {render} from 'fela-dom';

import {createRenderer} from '../renderer/create-renderer.js';
import {createConfig, createSystem} from './create.js';

export {load, getStore};

/**
 * @typedef {import('../types.js').Config} Config
 * @typedef {import('../types.js').CreateCssRenderer} CreateCssRenderer
 * @typedef {import('../types.js').H} H
 * @typedef {import('../types.js').Store} Store
 * @typedef {import('../types.js').System} System
 *

/** @type {Store} */
let store;

/**
 * Returns the system store.
 *
 * @returns {Store}
 */
const getStore = () => store;

/**
 * Loads the provided system into a store.
 *
 * @param {H} h
 *    Hyperscript h function.
 * @param {Partial<System>} [providedSystem]
 *    A partial system can be provided.
 * @param {Partial<Config>} [providedConfig]
 *    A partial system configuration can be provided.
 * @returns {void}
 */
const load = (h, providedSystem, providedConfig) => {
  const config = createConfig(providedConfig);
  const system = createSystem(providedSystem);
  const renderer = createRenderer(system, config);

  /** @type {CreateCssRenderer} */
  const createCssRenderer =
    (props = {}) =>
    (...rules) =>
      // @ts-ignore: source code incorrectly-typed (`combineRules` CAN accept either `TRule` or `IStyle`)
      renderer.renderRule(combineRules(...rules), {
        ...props,
        theme: system.theme,
      });

  // Aside from rendering CSS, uinix-ui supports server-side rendering.
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

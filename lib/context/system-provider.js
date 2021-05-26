import {createElement} from 'react';
import {RendererProvider, ThemeProvider} from 'react-fela';

import {createRenderer} from '../renderer/create-renderer.js';
import {createSystem} from '../system/index.js';
import {Context} from './context.js';

export {SystemProvider};

/**
 * The uinix `SystemProvider`.
 *
 * Exposes the uinix system of specs in a React Provider, and retrievable via relevant context hooks.
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children
 * @param {import('../system/index.js').System} props.system
 * @returns {import('react').ReactElement}
 */
const SystemProvider = (props) => {
  const {children, system: providedSystem} = props;
  const system = createSystem(providedSystem);
  const renderer = createRenderer(system);
  const {theme} = system;

  return createElement(
    RendererProvider,
    {renderer},
    createElement(
      ThemeProvider,
      {theme},
      createElement(Context.Provider, {value: system}, children),
    ),
  );
};

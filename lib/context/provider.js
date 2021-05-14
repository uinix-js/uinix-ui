import {createElement} from 'react';
import {RendererProvider, ThemeProvider} from 'react-fela/es/index.js';

import {createRenderer} from '../renderer/create-renderer.js';
import {createSystem} from '../system/index.js';
import {Context} from './context.js';

export {Provider};

const Provider = ({children, system: providedSystem}) => {
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

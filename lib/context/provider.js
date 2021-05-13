import {createElement} from 'react';
import {RendererProvider, ThemeProvider} from 'react-fela';

import {createRenderer} from '../renderer/create-renderer.js';
import {createSystem} from '../system/index.js';
import {Context} from './context.js';

export {Provider};

const Provider = (props) => {
  const {children, system: overrideSystem} = props;

  const system = createSystem(overrideSystem);
  const renderer = createRenderer(system);

  return createElement(
    RendererProvider,
    {renderer},
    createElement(
      ThemeProvider,
      {theme: system.theme},
      createElement(
        Context.Provider,
        {
          value: system,
        },
        children,
      ),
    ),
  );
};

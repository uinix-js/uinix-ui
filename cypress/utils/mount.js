import {mount as cypressMount} from '@cypress/react';
import React from 'react';

import {SystemProvider, createSystem, merge} from '../../index.js';

export {mount};

const defaultSystem = {
  config: {
    h: React.createElement,
  },
};

const mount = (element, system = defaultSystem) =>
  cypressMount(
    <SystemProvider system={createSystem(merge(defaultSystem)(system))}>
      {element}
    </SystemProvider>,
  );

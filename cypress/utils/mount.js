import {mount as cypressMount} from '@cypress/react';
import React from 'react';

import {createSystem, SystemProvider} from '../../index.js';

export {mount};

const mount = (element, system = createSystem()) => {
  return cypressMount(
    <SystemProvider system={system}>{element}</SystemProvider>,
  );
};

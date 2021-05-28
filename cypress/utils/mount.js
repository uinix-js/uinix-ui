import {mount as cypressMount} from '@cypress/react';
import React from 'react';

import {createSystem, SystemProvider} from '../../index.js';

export {mount};

const mount = (element, system) =>
  cypressMount(
    <SystemProvider system={createSystem(system)}>{element}</SystemProvider>,
  );

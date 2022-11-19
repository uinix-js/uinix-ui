import {mount as cypressMount} from '@cypress/react';
import {createElement} from 'react';
import {merge} from 'uinix-fp';
import themeSpec from 'uinix-theme-spec';

import {createSystem} from '../../index.js';

const defaultSystem = {config: {createElement}, themeSpec};

export const mountWithSystem = (element, system = defaultSystem) => {
  createSystem(merge(defaultSystem)(system));
  cypressMount(element);
};

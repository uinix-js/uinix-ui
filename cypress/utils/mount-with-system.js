import {mount as cypressMount} from '@cypress/react';
import {createElement as h} from 'react';
import themeSpec from 'uinix-theme-spec';

import {createSystem, merge} from '../../index.js';

const defaultSystem = {themeSpec};

export const mountWithSystem = (
  element,
  system = defaultSystem,
  config = {},
) => {
  createSystem({h, config, system: merge(defaultSystem)(system)});
  cypressMount(element);
};

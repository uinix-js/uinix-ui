import {mount as cypressMount} from '@cypress/react';
import {createElement as h} from 'react';
import {merge} from 'uinix-fp';
import themeSpec from 'uinix-theme-spec';

import {createSystem} from '../../index.js';

const defaultSystem = {themeSpec};

export const mountWithSystem = (
  element,
  system = defaultSystem,
  config = {},
) => {
  createSystem({h, config, system: merge(defaultSystem)(system)});
  cypressMount(element);
};

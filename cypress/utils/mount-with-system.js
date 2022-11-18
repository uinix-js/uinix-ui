import {mount as cypressMount} from '@cypress/react';
import {createElement as h} from 'react';
import themeSpec from 'uinix-theme-spec';

import {loadSystem, merge} from '../../index.js';

const defaultSystem = {themeSpec};

export const mountWithSystem = (
  element,
  system = defaultSystem,
  config = {},
) => {
  loadSystem({h, config, system: merge(defaultSystem)(system)});
  cypressMount(element);
};

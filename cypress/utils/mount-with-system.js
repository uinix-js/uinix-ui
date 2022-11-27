import {mount as cypressMount} from '@cypress/react';
import {createElement} from 'react';
import {merge} from 'uinix-fp';
import themeSpec from 'uinix-theme-spec';

import {createSystem} from '../../index.js';

const defaultConfig = {createElement};

const defaultSystem = {themeSpec};

export const mountWithSystem = (
  element,
  system = defaultSystem,
  config = defaultConfig,
) => {
  createSystem(merge(defaultSystem)(system), merge(defaultConfig)(config));
  cypressMount(element);
};

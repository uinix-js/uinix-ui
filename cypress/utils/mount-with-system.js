import {mount as cypressMount} from '@cypress/react';
import {createElement as h} from 'react';
import themeSpec from 'uinix-theme-spec';

import {load, merge} from '../../index.js';

export {mountWithSystem};

const defaultSystem = {
  themeSpec,
};

const mountWithSystem = (element, system = defaultSystem, config = {}) => {
  load({h, config, system: merge(defaultSystem)(system)});
  cypressMount(element);
};

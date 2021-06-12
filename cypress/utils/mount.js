import {mount as cypressMount} from '@cypress/react';
import React from 'react';

import {load, merge} from '../../index.js';

export {mount};

const defaultSystem = {
  config: {
    h: React.createElement,
  },
};

const mount = (element, system = {}) => {
  load(merge(defaultSystem)(system));
  cypressMount(element);
};

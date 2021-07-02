import {mount as cypressMount} from '@cypress/react';
import {createElement as h} from 'react';

import {load} from '../../index.js';

export {mountWithSystem};

const mountWithSystem = (element, system, config) => {
  load({h, config, system});
  cypressMount(element);
};

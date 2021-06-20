import {mount as cypressMount} from '@cypress/react';
import {createElement} from 'react';

import {load} from '../../index.js';

export {mountWithSystem};

const mountWithSystem = (element, system, config) => {
  load(createElement, system, config);
  cypressMount(element);
};

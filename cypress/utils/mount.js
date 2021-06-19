import {mount as cypressMount} from '@cypress/react';
import {createElement} from 'react';

import {load} from '../../index.js';

export {mount};

const mount = (element, system = {}) => {
  load(createElement, system);
  cypressMount(element);
};

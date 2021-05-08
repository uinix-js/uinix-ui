export {mountWithTheme};

import {mount} from '@cypress/react';
import React from 'react';

import {Provider} from '../../index.js';

const icons = {x: '<svg></svg>'};

const mountWithTheme = (component) => {
  return mount(<Provider icons={icons}>{component}</Provider>);
};

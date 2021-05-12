import {mount} from '@cypress/react';
import React from 'react';

import {Provider} from '../../index.js';

export {mountWithTheme};

const icons = {x: '<svg></svg>'};

const mountWithTheme = (component) => {
  return mount(<Provider icons={icons}>{component}</Provider>);
};

import React from 'react';

import {Icon} from '../../../index.js';
import {mount} from '../../utils/index.js';

describe('Icon', () => {
  it('should render', () => {
    mount(<Icon>Hello World!</Icon>);
    cy.contains('Hello World!').should('be.visible');
  });
});

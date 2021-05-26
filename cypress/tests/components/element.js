import React from 'react';

import {Element} from '../../../index.js';
import {mount} from '../../utils/index.js';

describe('Element', () => {
  it('should render', () => {
    mount(<Element>Hello World!</Element>);
    cy.contains('Hello World!').should('be.visible');
  });
});

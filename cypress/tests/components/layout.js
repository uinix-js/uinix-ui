import React from 'react';

import {Layout} from '../../../index.js';
import {mount} from '../../utils/index.js';

describe('Layout', () => {
  it('should render', () => {
    mount(<Layout>Hello World!</Layout>);
    cy.contains('Hello World!').should('be.visible');
  });
});

import React from 'react';

import {Text} from '../../../index.js';
import {mount} from '../../utils/index.js';

describe('Text', () => {
  it('should render', () => {
    mount(<Text>Hello World!</Text>);
    cy.contains('Hello World!').should('be.visible');
  });
});

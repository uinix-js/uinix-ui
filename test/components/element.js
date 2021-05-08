import React from 'react';

import {Element} from '../../index.js';
import {mountWithTheme} from '../util/mount-with-theme.js';

describe('Element', () => {
  it('should render', () => {
    mountWithTheme(<Element>Hello World!</Element>);

    cy.contains('Hello World!').should('be.visible');
  });
});

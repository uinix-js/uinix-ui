import React from 'react';

import { Layout } from '../../index.js';
import { mountWithTheme } from '../util/mount-with-theme.js';

describe('Layout', () => {
  it('should render', () => {
    mountWithTheme(<Layout>Hello World!</Layout>);

    cy.contains('Hello World!').should('be.visible');
  });
});

import React from 'react';

import {Element, Icon, Layout} from '../../../../index.js';
import {mountWithSystem} from '../../../utils/mount-with-system.js';

const system = {
  styles: {
    Container: {
      primary: {
        margin: '42px',
        padding: '42px',
      },
    },
  },
};

describe('styleVariant', () => {
  it('should apply variant style via Element, Icon, Layout element', () => {
    for (const Component of [Element, Icon, Layout]) {
      mountWithSystem(
        <Component id="test" styleVariant="Container.primary">
          Component
        </Component>,
        system,
      );
      cy.get('#test')
        .should('have.css', 'margin', '42px')
        .should('have.css', 'padding', '42px');
    }
  });
});

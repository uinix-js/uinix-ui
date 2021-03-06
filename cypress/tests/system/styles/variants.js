import React from 'react';

import {Element, Icon, Layout} from '../../../../index.js';
import {mountWithSystem} from '../../../utils/index.js';

const system = {
  styles: {
    variants: {
      Container: {
        primary: {
          margin: '42px',
          padding: '42px',
        },
      },
    },
  },
};

describe('styles.variants', () => {
  it('should apply variant style via Element, Icon, Layout element', () => {
    [Element, Icon, Layout].forEach((Component) => {
      mountWithSystem(
        <Component id="test" variant="Container.primary">
          Component
        </Component>,
        system,
      );
      cy.get('#test')
        .should('have.css', 'margin', '42px')
        .should('have.css', 'padding', '42px');
    });
  });
});

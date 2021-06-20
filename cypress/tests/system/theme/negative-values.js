import React from 'react';

import {Element} from '../../../../index.js';
import {mountWithSystem} from '../../../utils/index.js';

const system = {
  theme: {
    spacings: {
      xl: '42px',
    },
    zIndices: {
      nudge: '1',
    },
  },
};

const styles = {
  left: '-xl',
  margin: '-xl',
  padding: '-xl',
  zIndex: '-nudge',
};

describe('Negative values', () => {
  it('should resolve negative theme values appropriately to valid negative CSS property values', () => {
    mountWithSystem(
      <Element id="test" styles={styles}>
        Element
      </Element>,
      system,
    );
    cy.get('#test')
      .should('have.css', 'left', '-42px')
      .should('have.css', 'margin', '-42px')
      .should('have.css', 'padding', '0px') // Invalid negative value for padding will not be applied
      .should('have.css', 'z-index', '-1');
  });
});

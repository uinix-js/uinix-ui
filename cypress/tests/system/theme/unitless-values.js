import React from 'react';

import {Element} from '../../../../index.js';
import {mountWithSystem} from '../../../utils/mount-with-system.js';

const system = {
  theme: {
    fontSizes: {
      title: 42,
    },
    letterSpacings: {
      default: 20,
    },
    lineHeights: {
      default: 20,
    },
    opacities: {
      default: 0.3,
    },
    spacings: {
      xl: 42,
    },
  },
};

const styles = {
  fontSize: 'title',
  letterSpacing: '20px',
  margin: 'xl',
  opacity: 'default',
  padding: 'xl',
};

describe('Unitless values', () => {
  it('should resolve unitless theme styles appropriately to valid CSS property values', () => {
    mountWithSystem(
      <Element id="test" styles={styles}>
        Element
      </Element>,
      system,
    );
    cy.get('#test')
      .should('have.css', 'font-size', '42px')
      .should('have.css', 'letter-spacing', '20px')
      .should('have.css', 'margin', '42px')
      .should('have.css', 'opacity', '0.3')
      .should('have.css', 'padding', '42px');
  });
});

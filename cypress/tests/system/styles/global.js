import React from 'react';

import {Element, Text} from '../../../../index.js';
import {mountWithSystem} from '../../../utils/index.js';

const system = {
  styles: {
    static: {
      h1: {
        color: 'rgb(255, 0, 0)',
        fontSize: '42px',
        padding: '42px',
      },
    },
  },
};

describe('styles.static', () => {
  it('should not apply static styles on DOM element if not specified', () => {
    mountWithSystem(<h1>Heading</h1>);
    cy.get('h1').should('have.class', '');
  });

  it('should apply static styles on DOM element if specified', () => {
    mountWithSystem(<h1>Heading</h1>, system);
    cy.get('h1')
      .should('have.class', '')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'font-size', '42px')
      .should('have.css', 'padding', '42px');
  });

  it('should apply static styles on Element if specified', () => {
    mountWithSystem(
      <Element id="test" as="h1">
        Element
      </Element>,
      system,
    );
    cy.get('#test')
      .should('have.class', '')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'font-size', '42px')
      .should('have.css', 'padding', '42px');
  });

  it('should apply static styles on Text if specified', () => {
    mountWithSystem(
      <Text id="test" as="h1">
        Text
      </Text>,
      system,
    );
    cy.get('#test')
      .should('have.class', '')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'font-size', '42px')
      .should('have.css', 'padding', '42px');
  });
});

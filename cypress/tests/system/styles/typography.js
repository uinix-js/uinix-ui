import React from 'react';

import {Element, Text} from '../../../../index.js';
import {mount} from '../../../utils/index.js';

const system = {
  styles: {
    typography: {
      global: {
        h1: {
          color: 'rgb(255, 0, 0)',
          fontSize: '42px',
          padding: '42px',
        },
      },
      variants: {
        Link: {
          primary: {
            color: 'rgb(0, 0, 255)',
          },
        },
      },
    },
  },
};

describe('styles.typography', () => {
  it('should not apply global typography styles on DOM element if not specified', () => {
    mount(<h1>Heading</h1>);
    cy.get('h1').should('have.class', '');
  });

  it('should apply global typography styles on DOM element if specified', () => {
    mount(<h1>Heading</h1>, system);
    cy.get('h1')
      .should('have.class', '')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'font-size', '42px')
      .should('have.css', 'padding', '42px');
  });

  it('should apply global typography styles on Element if specified', () => {
    mount(
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

  it('should apply global typography styles on Text if specified', () => {
    mount(
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

  it('should apply typography variant style via Text element', () => {
    mount(
      <Text id="test" variant="Link.primary">
        Text
      </Text>,
      system,
    );
    cy.get('#test').should('have.css', 'color', 'rgb(0, 0, 255)');
  });
});

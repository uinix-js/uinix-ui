import React from 'react';

import {Element, Icon, Layout, Text} from '../../../../../index.js';
import {mount} from '../../../../utils/index.js';

const system = {
  config: {
    elementStyles: [
      {backgroundColor: 'rgb(225, 225, 225)'},
      () => ({color: 'rgb(255, 0, 0)'}),
      ({disabled}) => ({opacity: disabled ? 0.3 : 1}),
      ({fontSize}) => ({fontSize}),
    ],
  },
};

describe('config.elementStyles', () => {
  it('should not render any CSS if no styles are provided', () => {
    mount(<Element id="test">Element</Element>);
    cy.get('#test').should('have.class', '');
  });

  it('should render CSS if styles are provided', () => {
    mount(<Element id="test">Element</Element>, system);
    cy.get('#test')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'background-color', 'rgb(225, 225, 225)')
      .should('have.css', 'opacity', '1');
  });

  it('should apply component props to style functions', () => {
    mount(
      <Element disabled id="test" fontSize="42px">
        Element
      </Element>,
      system,
    );
    cy.get('#test')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'background-color', 'rgb(225, 225, 225)')
      .should('have.css', 'opacity', '0.3')
      .should('have.css', 'font-size', '42px');
  });

  it('should apply elementStyles for all UI components', () => {
    [Element, Icon, Layout, Text].forEach((Component) => {
      mount(
        <Component disabled id="test" fontSize="42px">
          Component
        </Component>,
        system,
      );
      cy.get('#test')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'background-color', 'rgb(225, 225, 225)')
        .should('have.css', 'opacity', '0.3')
        .should('have.css', 'font-size', '42px');
    });
  });
});

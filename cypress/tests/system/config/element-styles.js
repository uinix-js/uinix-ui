import React from 'react';

import {Element, Icon, Layout, Text} from '../../../../index.js';
import {mount} from '../../../utils/index.js';

const system = {
  config: {
    elementStyles: [
      {backgroundColor: 'rgb(225, 225, 225)'},
      () => ({color: 'rgb(255, 0, 0)'}),
      ({disabled}) => ({opacity: disabled ? 0.3 : 1}),
      ({fontSize}) => ({fontSize}),
    ],
  },
  icons: {
    x: '<svg>x</svg>',
  },
};

describe('elementStyles', () => {
  it('should not render any CSS if no styles are provided', () => {
    mount(<Element>Element</Element>);
    cy.contains('div', 'Element').should('have.class', '');
  });

  it('should render CSS if styles are provided', () => {
    mount(<Element>Element</Element>, system);
    cy.contains('div', 'Element')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'background-color', 'rgb(225, 225, 225)')
      .should('have.css', 'opacity', '1');
  });

  it('should apply component props to style functions', () => {
    mount(
      <Element disabled fontSize="42px">
        Element
      </Element>,
      system,
    );
    cy.contains('div', 'Element')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'background-color', 'rgb(225, 225, 225)')
      .should('have.css', 'opacity', '0.3')
      .should('have.css', 'font-size', '42px');
  });

  it('should apply elementStyles for all UI components', () => {
    [Element, Icon, Layout, Text].forEach((Component) => {
      const restProps = {icon: 'x'};
      mount(
        <Component disabled id="component" fontSize="42px" {...restProps}>
          Component
        </Component>,
        system,
      );
      cy.get('#component')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'background-color', 'rgb(225, 225, 225)')
        .should('have.css', 'opacity', '0.3')
        .should('have.css', 'font-size', '42px');
    });
  });
});

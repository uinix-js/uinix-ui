import React from 'react';

import {Element, Icon, Layout, Text} from '../../../../index.js';
import {mount} from '../../../utils/index.js';

const responsiveStyles = {
  color: ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'],
  backgroundColor: 'rgb(225, 225, 225)',
  margin: ['8px', '16px', '32px'],
  padding: ['8px', '16px', '32px'],
};

const system = {
  config: {
    responsiveCssProperties: ['color', 'padding'],
  },
  styles: {
    breakpoints: ['480px', '768px'],
  },
};

const viewportHeight = 400;
const viewportWidths = [300, 500, 800]; // Covering all situations specified in system.styles.breakpoints

describe('config.responsiveCssProperties', () => {
  it('should apply the last respective responsive style if breakpoints are specified but responsive CSS properties are not specified', () => {
    const system = {
      styles: {
        breakpoints: ['480px', '768px'],
      },
    };
    mount(<Element styles={responsiveStyles}>Element</Element>, system);
    cy.contains('div', 'Element')
      .should('have.css', 'background-color', 'rgb(225, 225, 225)')
      .should('have.css', 'color', responsiveStyles.color[2])
      .should('have.css', 'margin', responsiveStyles.margin[2])
      .should('have.css', 'padding', responsiveStyles.padding[2]);
  });

  it('should apply responsive style value on specified responsive CSS properties', () => {
    viewportWidths.forEach((viewportWidth, i) => {
      mount(<Element styles={responsiveStyles}>Element</Element>, system);
      cy.viewport(viewportWidth, viewportHeight);
      cy.contains('div', 'Element')
        // Registered responsive styles
        .should('have.css', 'color', responsiveStyles.color[i])
        .should('have.css', 'padding', responsiveStyles.padding[i])
        // Unregistered and non-responsive styles
        .should('have.css', 'background-color', 'rgb(225, 225, 225)')
        .should('have.css', 'margin', responsiveStyles.margin[2]);
    });
  });

  it('should apply responsive style value on specified responsive CSS properties for all UI components', () => {
    [Element, Icon, Layout, Text].forEach((Component) => {
      viewportWidths.forEach((viewportWidth, i) => {
        mount(
          <Component id="component" styles={responsiveStyles}>
            Element
          </Component>,
          system,
        );
        cy.viewport(viewportWidth, viewportHeight);
        cy.get('#component')
          // Registered responsive styles
          .should('have.css', 'color', responsiveStyles.color[i])
          .should('have.css', 'padding', responsiveStyles.padding[i])
          // Unregistered and non-responsive styles
          .should('have.css', 'background-color', 'rgb(225, 225, 225)')
          .should('have.css', 'margin', responsiveStyles.margin[2]);
      });
    });
  });
});

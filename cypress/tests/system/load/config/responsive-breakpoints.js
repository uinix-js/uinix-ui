import React from 'react';

import {Element, Icon, Layout, Text} from '../../../../../index.js';
import {mountWithSystem} from '../../../../utils/mount-with-system.js';

const responsiveStyles = {
  color: 'rgb(225, 225, 225)',
  backgroundColor: ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'],
  margin: ['8px', '16px', '32px'],
  padding: ['8px', '16px', '32px'],
};

const config = {
  responsiveBreakpoints: ['480px', '768px'],
  responsiveCssProperties: ['backgroundColor', 'padding'],
};

const viewportHeight = 400;
const viewportWidths = [300, 500, 800]; // Covering all situations specified in system.styles.breakpoints

describe('config.responsiveBreakpoints', () => {
  it('should apply the last responsive style value if breakpoints are not specified', () => {
    mountWithSystem(
      <Element id="test" styles={responsiveStyles}>
        Element
      </Element>,
    );
    cy.get('#test')
      .should('have.css', 'color', responsiveStyles.color)
      .should(
        'have.css',
        'background-color',
        responsiveStyles.backgroundColor[2],
      )
      .should('have.css', 'margin', responsiveStyles.margin[2])
      .should('have.css', 'padding', responsiveStyles.padding[2]);
  });

  it('should apply responsive style value on specified responsive CSS properties for all UI components', () => {
    for (const Component of [Element, Icon, Layout, Text]) {
      for (const [i, viewportWidth] of viewportWidths.entries()) {
        mountWithSystem(
          <Component id="test" styles={responsiveStyles}>
            Element
          </Component>,
          {},
          config,
        );
        cy.viewport(viewportWidth, viewportHeight);
        cy.get('#test')
          // Registered responsive styles
          .should(
            'have.css',
            'background-color',
            responsiveStyles.backgroundColor[i],
          )
          .should('have.css', 'padding', responsiveStyles.padding[i])
          // Unregistered and non-responsive styles
          .should('have.css', 'color', responsiveStyles.color)
          .should('have.css', 'margin', responsiveStyles.margin[2]);
      }
    }
  });
});

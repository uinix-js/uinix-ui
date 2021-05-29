import React from 'react';

import {Element, Icon, Layout, Text} from '../../../../index.js';
import {mount} from '../../../utils/index.js';

describe('config.elementShorthandPropsMapping', () => {
  it('should not apply shorthand props style if not configured', () => {
    mount(<Element p="24px">Element</Element>);
    cy.contains('div', 'Element').should('not.have.css', 'padding', '24px');
  });

  it('should apply shorthand props style if configured', () => {
    const system = {
      config: {
        elementShorthandPropsMapping: {
          color: ['color'],
          margin: ['m'],
          padding: ['p'],
        },
      },
    };
    mount(
      <Element color="rgb(255, 0, 0)" m="12px" p="24px">
        Element
      </Element>,
      system,
    );
    cy.contains('div', 'Element')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'margin', '12px')
      .should('have.css', 'padding', '24px');
  });

  it('should apply shorthand props style with precedence', () => {
    const system = {
      config: {
        elementShorthandPropsMapping: {
          margin: ['m'],
          marginLeft: ['ml', 'mx', 'm'],
          marginBottom: ['mb', 'my', 'm'],
          marginRight: ['mr', 'mx', 'm'],
          marginTop: ['mt', 'my', 'm'],
        },
      },
    };
    mount(<Element mx="24px">Element</Element>, system);
    cy.contains('div', 'Element')
      .should('have.css', 'margin-left', '24px')
      .should('have.css', 'margin-right', '24px');

    mount(
      <Element mx="4px" mt="12px" m="48px">
        Element
      </Element>,
      system,
    );
    cy.contains('div', 'Element')
      .should('have.css', 'margin-bottom', '48px')
      .should('have.css', 'margin-top', '12px')
      .should('have.css', 'margin-left', '4px')
      .should('have.css', 'margin-right', '4px');
  });

  it('should apply shorthand props style for all UI components', () => {
    const system = {
      config: {
        elementShorthandPropsMapping: {
          color: ['color'],
          margin: ['m'],
          padding: ['p'],
        },
      },
    };

    [Element, Icon, Layout, Text].forEach((Component) => {
      mount(
        <Component id="component" color="rgb(255, 0, 0)" m="42px" p="24px">
          Component
        </Component>,
        system,
      );
      cy.get('#component')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'margin', '42px')
        .should('have.css', 'padding', '24px');
    });
  });
});

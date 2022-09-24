import React from 'react';

import {Element, Icon, Layout, Text} from '../../../../../index.js';
import system from '../../../../fixtures/test-system.js';
import {mountWithSystem} from '../../../../utils/index.js';

describe('config.elementShorthandPropsMapping', () => {
  it('should not apply shorthand props style if not configured', () => {
    mountWithSystem(
      <Element id="test" p="24px">
        Element
      </Element>,
    );

    cy.get('#test').should('not.have.css', 'padding', '24px');
  });

  it('should apply shorthand props style if configured', () => {
    const config = {
      elementShorthandPropsMapping: {
        color: ['color'],
        margin: ['m'],
        padding: ['p'],
      },
    };
    mountWithSystem(
      <Element id="test" color="rgb(255, 0, 0)" m="12px" p="24px">
        Element
      </Element>,
      system,
      config,
    );
    cy.get('#test')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .should('have.css', 'margin', '12px')
      .should('have.css', 'padding', '24px');
  });

  it('should apply shorthand props style with precedence', () => {
    const config = {
      elementShorthandPropsMapping: {
        margin: ['m'],
        marginLeft: ['ml', 'mx', 'm'],
        marginBottom: ['mb', 'my', 'm'],
        marginRight: ['mr', 'mx', 'm'],
        marginTop: ['mt', 'my', 'm'],
      },
    };
    mountWithSystem(
      <Element id="test" mx="24px">
        Element
      </Element>,
      system,
      config,
    );

    cy.get('#test')
      .should('have.css', 'margin-left', '24px')
      .should('have.css', 'margin-right', '24px');

    mountWithSystem(
      <Element id="test" mx="4px" mt="12px" m="48px">
        Element
      </Element>,
      system,
      config,
    );
    cy.get('#test')
      .should('have.css', 'margin-bottom', '48px')
      .should('have.css', 'margin-top', '12px')
      .should('have.css', 'margin-left', '4px')
      .should('have.css', 'margin-right', '4px');
  });

  it('should apply shorthand props style with precedence (falsy values)', () => {
    const config = {
      elementShorthandPropsMapping: {
        margin: ['m'],
        marginLeft: ['ml', 'mx', 'm'],
        marginBottom: ['mb', 'my', 'm'],
        marginRight: ['mr', 'mx', 'm'],
        marginTop: ['mt', 'my', 'm'],
      },
    };
    mountWithSystem(
      <Element id="test" mx={0}>
        Element
      </Element>,
      system,
      config,
    );

    cy.get('#test')
      .should('have.css', 'margin-left', '0px')
      .should('have.css', 'margin-right', '0px');

    mountWithSystem(
      <Element id="test" mx={4} mt={0} m={48}>
        Element
      </Element>,
      system,
      config,
    );
    cy.get('#test')
      .should('have.css', 'margin-bottom', '48px')
      .should('have.css', 'margin-top', '0px')
      .should('have.css', 'margin-left', '4px')
      .should('have.css', 'margin-right', '4px');
  });

  it('should apply shorthand props style for all UI components', () => {
    const config = {
      elementShorthandPropsMapping: {
        color: ['color'],
        margin: ['m'],
        padding: ['p'],
      },
    };
    for (const Component of [Element, Icon, Layout, Text]) {
      mountWithSystem(
        <Component id="test" color="rgb(255, 0, 0)" m="42px" p="24px">
          Component
        </Component>,
        system,
        config,
      );
      cy.get('#test')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'margin', '42px')
        .should('have.css', 'padding', '24px');
    }
  });
});

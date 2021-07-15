import React from 'react';

import {Layout} from '../../../index.js';
import system from '../../fixtures/test-system.js';
import {mountWithSystem} from '../../utils/index.js';

const children = Array.from({length: 3}).map((_, i) => (
  <button key={i} type="button">
    Button {i + 1}
  </button>
));

describe('Layout', () => {
  describe('Props', () => {
    describe('children', () => {
      it('should render as a div flex container with text content', () => {
        mountWithSystem(<Layout id="test">Layout</Layout>);
        cy.get('#test')
          .should('have.prop', 'nodeName', 'DIV')
          .should('have.css', 'display', 'flex')
          .should('have.html', 'Layout');
      });

      it('should render with child elements', () => {
        mountWithSystem(<Layout id="test">{children}</Layout>);
        cy.contains('#test > button', 'Button 1').should('exist');
        cy.contains('#test > button', 'Button 2').should('exist');
        cy.contains('#test > button', 'Button 3').should('exist');
      });
    });

    describe('align', () => {
      it('should apply to the CSS "align-items" property', () => {
        mountWithSystem(
          <Layout id="test" align="flex-end">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'align-items', 'flex-end');
      });
    });

    describe('alignSelf', () => {
      it('should apply to the CSS "align-self" property', () => {
        mountWithSystem(
          <Layout id="test" alignSelf="flex-end">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'align-self', 'flex-end');
      });
    });

    describe('direction', () => {
      it('should apply to the CSS "flex-direction" property', () => {
        mountWithSystem(
          <Layout id="test" direction="column">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'flex-direction', 'column');
      });
    });

    describe('flex', () => {
      it('should apply to the CSS "flex" property', () => {
        mountWithSystem(
          <Layout id="test" flex="1 1 auto">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'flex', '1 1 auto');
      });
    });

    describe('inline', () => {
      it('should set the CSS "display" property to "inline-flex" if true', () => {
        mountWithSystem(
          <Layout inline id="test">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'display', 'inline-flex');
      });
    });

    describe('justify', () => {
      it('should apply to the CSS "justify-content" property', () => {
        mountWithSystem(
          <Layout id="test" justify="flex-end">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'justify-content', 'flex-end');
      });
    });

    describe('justifySelf', () => {
      it('should apply to the CSS "justify-self" property', () => {
        mountWithSystem(
          <Layout id="test" justifySelf="flex-end">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'justify-self', 'flex-end');
      });
    });

    describe('spacing', () => {
      it('should space children evenly by applying "margin-right" on all children except the last', () => {
        const spacing = '20px';
        mountWithSystem(
          <Layout id="test" spacing={spacing}>
            {children}
          </Layout>,
        );
        cy.contains('#test > button', 'Button 1').should(
          'have.css',
          'margin-right',
          spacing,
        );
        cy.contains('#test > button', 'Button 2').should(
          'have.css',
          'margin-right',
          spacing,
        );
        cy.contains('#test > button', 'Button 3').should(
          'not.have.css',
          'margin-right',
          spacing,
        );
      });

      it('should space children evenly by applying "margin-bottom" on all children except the last if the "direction" prop is set to "column"', () => {
        const spacing = '20px';
        mountWithSystem(
          <Layout id="test" direction="column" spacing={spacing}>
            {children}
          </Layout>,
        );
        cy.contains('#test > button', 'Button 1').should(
          'have.css',
          'margin-bottom',
          spacing,
        );
        cy.contains('#test > button', 'Button 2').should(
          'have.css',
          'margin-bottom',
          spacing,
        );
        cy.contains('#test > button', 'Button 3').should(
          'not.have.css',
          'margin-bottom',
          spacing,
        );
      });
    });

    describe('wrap', () => {
      it('should set the CSS "flex-wrap" property to "wrap" if true', () => {
        mountWithSystem(
          <Layout wrap id="test">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'flex-wrap', 'wrap');
      });
    });

    describe('wrapSpacing', () => {
      it('should apply "margin-top" on all children and an equal negative margin-top on the layout container when the "wrap" property is true', () => {
        mountWithSystem(
          <Layout wrap id="test" wrapSpacing="10px" spacing="20px">
            {children}
          </Layout>,
        );
        cy.get('#test')
          .should('have.css', 'flex-wrap', 'wrap')
          .should('have.css', 'margin-top', '-10px');
        cy.contains('#test > button', 'Button 1')
          .should('have.css', 'margin-right', '20px')
          .should('have.css', 'margin-top', '10px');
        cy.contains('#test > button', 'Button 2')
          .should('have.css', 'margin-right', '20px')
          .should('have.css', 'margin-top', '10px');
        cy.contains('#test > button', 'Button 3')
          .should('not.have.css', 'margin-right', '20px')
          .should('have.css', 'margin-top', '10px');
      });
    });

    describe('Other', () => {
      it('should support Element props', () => {
        const style1 = {
          color: 'rgb(255, 0, 0)',
          cursor: 'pointer',
        };
        const style2 = ({isActive}) => ({
          color: isActive ? 'rgb(0, 0, 255)' : undefined,
        });
        const styles = [style1, style2];
        const styleProps = {isActive: true};

        mountWithSystem(
          <Layout
            id="test"
            as="a"
            href="https://uinix.dev/"
            className="a b"
            styleProps={styleProps}
            styles={styles}
            variant="Card.small"
          >
            {children}
          </Layout>,
          system,
        );
        cy.get('#test')
          .should('have.prop', 'nodeName', 'A')
          .should('have.prop', 'href', 'https://uinix.dev/')
          .should('have.class', 'a')
          .should('have.class', 'b')
          .should('have.css', 'cursor', 'pointer') // Via style1
          .should('have.css', 'color', 'rgb(0, 0, 255)') // Via style2
          .should('have.css', 'padding', '4px'); // Via variant
      });
    });
  });
});

import React from 'react';

import {Layout} from '../../../index.js';
import {mount} from '../../utils/index.js';

const children = Array.from({length: 3}).map((_, i) => (
  <button key={i} type="button">
    Button {i + 1}
  </button>
));

describe('Layout', () => {
  describe('Props', () => {
    describe('children', () => {
      it('should render as a flex container with text content', () => {
        mount(<Layout id="test">Layout</Layout>);
        cy.get('#test').should('have.css', 'display', 'flex');
      });

      it('should render with React elements', () => {
        mount(<Layout id="test">{children}</Layout>);
        cy.contains('#test > button', 'Button 1').should('exist');
        cy.contains('#test > button', 'Button 2').should('exist');
        cy.contains('#test > button', 'Button 3').should('exist');
      });
    });

    describe('align', () => {
      it('should apply to the CSS "align-items" property', () => {
        mount(
          <Layout id="test" align="flex-end">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'align-items', 'flex-end');
      });
    });

    describe('alignSelf', () => {
      it('should apply to the CSS "align-self" property', () => {
        mount(
          <Layout id="test" alignSelf="flex-end">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'align-self', 'flex-end');
      });
    });

    describe('direction', () => {
      it('should apply to the CSS "flex-direction" property', () => {
        mount(
          <Layout id="test" direction="column">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'flex-direction', 'column');
      });
    });

    describe('flex', () => {
      it('should apply to the CSS "flex" property', () => {
        mount(
          <Layout id="test" flex="1 1 auto">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'flex', '1 1 auto');
      });
    });

    describe('inline', () => {
      it('should set the CSS "display" property to "inline-flex" if true', () => {
        mount(
          <Layout inline id="test">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'display', 'inline-flex');
      });
    });

    describe('justify', () => {
      it('should apply to the CSS "justify-content" property', () => {
        mount(
          <Layout id="test" justify="flex-end">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'justify-content', 'flex-end');
      });
    });

    describe('justifySelf', () => {
      it('should apply to the CSS "justify-self" property', () => {
        mount(
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
        mount(
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
        mount(
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
        mount(
          <Layout wrap id="test">
            {children}
          </Layout>,
        );
        cy.get('#test').should('have.css', 'flex-wrap', 'wrap');
      });
    });

    describe('wrapSpacing', () => {
      it('should apply "margin-top" on all children and an equal negative margin-top on the layout container when the "wrap" property is true', () => {
        mount(
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

        cy.fixture('system').then((system) => {
          mount(
            <Layout
              id="test"
              as="p"
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
            .should('have.class', 'a')
            .should('have.class', 'b')
            .should('have.css', 'cursor', 'pointer') // Via style1
            .should('have.css', 'color', 'rgb(0, 0, 255)') // Via style2
            .should('have.css', 'padding', '4px'); // Via variant
        });
      });
    });
  });
});

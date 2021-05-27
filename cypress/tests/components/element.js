import React from 'react';

import {Element} from '../../../index.js';
import {mount} from '../../utils/index.js';

describe('Element', () => {
  describe('Props', () => {
    describe('children', () => {
      it('should render with no content', () => {
        mount(<Element />);
        cy.get('div').should('exist');
      });

      it('should render with text content', () => {
        mount(<Element>Element</Element>);
        cy.contains('div', 'Element').should('exist');
      });

      it('should render with React elements', () => {
        mount(
          <Element>
            <strong>Strong</strong>
            Element
          </Element>,
        );
        cy.contains('strong', 'Strong').should('exist');
      });
    });

    describe('as', () => {
      it('should render as the specified element', () => {
        mount(<Element as="strong">Element</Element>);
        cy.contains('strong', 'Element').should('exist');
      });
    });

    describe('className', () => {
      it('should apply the className prop', () => {
        mount(<Element className="a b">Element</Element>);
        cy.contains('div', 'Element')
          .should('have.class', 'a')
          .should('have.class', 'b');
      });
    });

    describe('styles', () => {
      it('should apply CSS styles with common CSS-in-JS features when specified as a singleton object', () => {
        mount(
          <Element
            styles={{
              backgroundColor: 'rgb(225, 225, 225)',
              color: 'rgb(255, 0, 0)',
              '& button': {
                color: 'rgb(0, 0, 255)',
                ':focus': {
                  color: 'rgb(0, 255, 0)',
                },
                '::after': {
                  content: '" (after) "',
                },
              },
            }}
          >
            <button type="button">Button</button>
            Element
          </Element>,
        );
        cy.contains('div', 'Element')
          .should('have.css', 'backgroundColor', 'rgb(225, 225, 225)')
          .should('have.css', 'color', 'rgb(255, 0, 0)');
        cy.contains('button', 'Button')
          .should('have.css', 'color', 'rgb(0, 0, 255)')
          .focus()
          .should('have.css', 'color', 'rgb(0, 255, 0)')
          .should(($element) => {
            const afterCssStyle = window.getComputedStyle($element[0], 'after');
            expect(afterCssStyle.getPropertyValue('content')).to.equal(
              '" (after) "',
            );
          });
      });

      it('should apply CSS styles with common CSS-in-JS features when specified as an array of styles (objects/functions/null)', () => {
        const style1 = {
          backgroundColor: 'rgb(225, 225, 225)',
          color: 'rgb(255, 0, 0)',
          '& button': {
            color: 'rgb(0, 0, 255)',
            ':focus': {
              color: 'rgb(0, 255, 0)',
            },
            '::after': {
              content: '" (after) "',
            },
          },
        };
        const style2 = null;
        const style3 = () => ({color: 'rgb(255, 0, 255)'});

        mount(
          <Element styles={[style1, style2, style3]}>
            <button type="button">Button</button>
            Element
          </Element>,
        );
        cy.contains('div', 'Element')
          .should('have.css', 'backgroundColor', 'rgb(225, 225, 225)')
          .should('have.css', 'color', 'rgb(255, 0, 255)');
        cy.contains('button', 'Button')
          .should('have.css', 'color', 'rgb(0, 0, 255)')
          .focus()
          .should('have.css', 'color', 'rgb(0, 255, 0)')
          .should(($element) => {
            const afterCssStyle = window.getComputedStyle($element[0], 'after');
            expect(afterCssStyle.getPropertyValue('content')).to.equal(
              '" (after) "',
            );
          });
      });
    });

    describe('styleProps', () => {
      it('should apply stylesProps with relating style functions', () => {
        const style1 = ({isActive}) => ({
          color: isActive ? 'rgb(0, 0, 255)' : 'rgb(0, 0, 0)',
        });
        const style2 = ({isBold}) => ({
          fontWeight: isBold ? '700' : '400',
        });
        const styles = [style1, style2];

        mount(<Element styles={styles}>Regular Element</Element>);
        cy.contains('div', 'Regular Element')
          .should('have.css', 'color', 'rgb(0, 0, 0)')
          .should('have.css', 'fontWeight', '400');

        mount(
          <Element
            styles={styles}
            styleProps={{
              isActive: true,
            }}
          >
            Active Element
          </Element>,
        );
        cy.contains('div', 'Active Element')
          .should('have.css', 'color', 'rgb(0, 0, 255)')
          .should('have.css', 'fontWeight', '400');

        mount(
          <Element
            styles={styles}
            styleProps={{
              isBold: true,
            }}
          >
            Bold Element
          </Element>,
        );
        cy.contains('div', 'Bold Element')
          .should('have.css', 'color', 'rgb(0, 0, 0)')
          .should('have.css', 'fontWeight', '700');

        mount(
          <Element
            styles={styles}
            styleProps={{
              isActive: true,
              isBold: true,
            }}
          >
            Active and Bold Element
          </Element>,
        );
        cy.contains('div', 'Active and Bold Element')
          .should('have.css', 'color', 'rgb(0, 0, 255)')
          .should('have.css', 'fontWeight', '700');
      });
    });

    describe('variant', () => {
      it('should apply styles specified through the system.styles.variants API', () => {
        const system = {
          styles: {
            variants: {
              Button: {
                primary: {
                  color: 'rgb(0, 0, 255)',
                  ':focus': {
                    opacity: '0.7',
                    color: 'rgb(0, 0, 125)',
                  },
                },
              },
            },
          },
        };

        mount(
          <Element as="button" variant="Button.primary">
            Element
          </Element>,
          system,
        );
        cy.contains('button', 'Element')
          .should('have.css', 'color', 'rgb(0, 0, 255)')
          .focus()
          .should('have.css', 'opacity', '0.7')
          .should('have.css', 'color', 'rgb(0, 0, 125)');
      });
    });

    describe('Other', () => {
      it('should attach HTML attributes as a React element would', () => {
        mount(
          <Element
            aria-title="aria-title"
            data-field="data-field"
            name="name"
            id="id"
            htmlFor="for"
          >
            Element
          </Element>,
        );
        cy.contains('div', 'Element')
          .should('have.attr', 'aria-title', 'aria-title')
          .should('have.attr', 'data-field', 'data-field')
          .should('have.attr', 'name', 'name')
          .should('have.attr', 'id', 'id')
          .should('have.attr', 'for', 'for');
      });
    });
  });
});

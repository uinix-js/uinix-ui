import React from 'react';

import {Element} from '../../../index.js';
import system from '../../fixtures/test-system.js';
import {mountWithSystem} from '../../utils/index.js';

describe('Element', () => {
  describe('Props', () => {
    describe('children', () => {
      it('should render as a div element with text content', () => {
        mountWithSystem(<Element id="test">Element</Element>);
        cy.get('#test')
          .should('have.prop', 'nodeName', 'DIV')
          .should('have.html', 'Element');
      });

      it('should render with child elements', () => {
        mountWithSystem(
          <Element id="test">
            <strong>Strong</strong> Element
          </Element>,
        );
        cy.get('#test')
          .should('have.prop', 'nodeName', 'DIV')
          .should('have.html', '<strong>Strong</strong> Element');
      });
    });

    describe('as', () => {
      it('should render as the specified HTML element', () => {
        mountWithSystem(
          <Element id="test" as="a" href="https://uinix.dev/">
            Element
          </Element>,
        );
        cy.get('#test')
          .should('have.prop', 'nodeName', 'A')
          .should('have.prop', 'href', 'https://uinix.dev/');
      });

      it('should render as the specified custom element passing through Element props', () => {
        function CustomElement({x, ...rest}) {
          return (
            <Element as="a" {...rest}>
              Custom Element: {x}
            </Element>
          );
        }

        mountWithSystem(
          <Element
            id="test"
            as={CustomElement}
            href="https://uinix.dev/"
            x="x"
            styleProps={{
              isActive: true,
            }}
            styles={({isActive}) => ({
              color: isActive ? 'rgb(0, 0, 255)' : 'rgb(0, 0, 0)',
            })}
          >
            Element
          </Element>,
        );
        cy.get('#test')
          .should('have.prop', 'nodeName', 'A')
          .should('have.prop', 'href', 'https://uinix.dev/')
          .should('have.html', 'Custom Element: x')
          .should('have.css', 'color', 'rgb(0, 0, 255)');
      });
    });

    describe('className', () => {
      it('should apply the className prop', () => {
        mountWithSystem(
          <Element id="test" className="a b">
            Element
          </Element>,
        );
        cy.get('#test').should('have.class', 'a').should('have.class', 'b');
      });
    });

    describe('styles', () => {
      it('should apply CSS styles with common CSS-in-JS features when specified as a singleton object', () => {
        mountWithSystem(
          <Element
            id="test"
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
        cy.get('#test')
          .should('have.css', 'backgroundColor', 'rgb(225, 225, 225)')
          .should('have.css', 'color', 'rgb(255, 0, 0)');
        cy.get('#test > button')
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

        mountWithSystem(
          <Element id="test" styles={[style1, style2, style3]}>
            <button type="button">Button</button>
            Element
          </Element>,
        );
        cy.get('#test')
          .should('have.css', 'backgroundColor', 'rgb(225, 225, 225)')
          .should('have.css', 'color', 'rgb(255, 0, 255)');
        cy.get('#test > button')
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

        mountWithSystem(
          <Element id="test" styles={styles}>
            Element
          </Element>,
        );
        cy.get('#test')
          .should('have.css', 'color', 'rgb(0, 0, 0)')
          .should('have.css', 'fontWeight', '400');

        mountWithSystem(
          <Element
            id="test"
            styleProps={{
              isActive: true,
            }}
            styles={styles}
          >
            Active Element
          </Element>,
        );
        cy.get('#test')
          .should('have.css', 'color', 'rgb(0, 0, 255)')
          .should('have.css', 'fontWeight', '400');

        mountWithSystem(
          <Element
            id="test"
            styleProps={{
              isBold: true,
            }}
            styles={styles}
          >
            Bold Element
          </Element>,
        );
        cy.get('#test')
          .should('have.css', 'color', 'rgb(0, 0, 0)')
          .should('have.css', 'fontWeight', '700');

        mountWithSystem(
          <Element
            id="test"
            styleProps={{
              isActive: true,
              isBold: true,
            }}
            styles={styles}
          >
            Active and Bold Element
          </Element>,
        );
        cy.get('#test')
          .should('have.css', 'color', 'rgb(0, 0, 255)')
          .should('have.css', 'fontWeight', '700');
      });
    });

    describe('variant', () => {
      it('should apply styles specified through the system.styles.variants API', () => {
        mountWithSystem(
          <Element id="test" as="button" variant="Button.primary">
            Element
          </Element>,
          system,
        );
        cy.get('#test')
          .should('have.css', 'color', 'rgb(0, 0, 255)')
          .focus()
          .should('have.css', 'opacity', '0.7')
          .should('have.css', 'color', 'rgb(0, 0, 125)');
      });
    });

    describe('Other', () => {
      it('should attach HTML attributes as a React element would', () => {
        mountWithSystem(
          <Element
            id="test"
            aria-title="aria-title"
            data-field="data-field"
            name="name"
            htmlFor="for"
          >
            Element
          </Element>,
        );
        cy.get('#test')
          .should('have.attr', 'id', 'test')
          .should('have.attr', 'aria-title', 'aria-title')
          .should('have.attr', 'data-field', 'data-field')
          .should('have.attr', 'name', 'name')
          .should('have.attr', 'for', 'for');
      });
    });
  });
});

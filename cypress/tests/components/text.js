import React from 'react';

import {Text} from '../../../index.js';
import testSystem from '../../fixtures/test-system.js';
import {decamelizeCssProperty, mount} from '../../utils/index.js';

describe('Text', () => {
  describe('Props', () => {
    describe('children', () => {
      it('should render as a span with text content', () => {
        mount(<Text id="test">Text</Text>);
        cy.get('#test').should('exist');
      });

      it('should render with React elements', () => {
        mount(
          <Text id="test">
            <strong>Strong</strong> Text
          </Text>,
        );
        cy.get('#test').should('exist');
      });
    });

    const fontProps = [
      {fontFamily: 'courier'},
      {fontSize: '42px'},
      {fontStyle: 'italic'},
      {fontVariant: 'lining-nums'},
      {fontWeight: '700'},
      {letterSpacing: '4.2px'},
      {lineHeight: '4.2px'},
      {textAlign: 'center'},
      {textDecoration: 'underline solid rgb(0, 0, 0)'},
      {textOverflow: 'ellipsis'},
      {textShadow: 'rgb(0, 0, 0) 5px 10px 0px'},
      {textTransform: 'capitalize'},
      {whiteSpace: 'pre-wrap'},
      {wordBreak: 'break-all'},
      {wordSpacing: '4.2px'},
    ];
    fontProps.forEach((props) => {
      const [propName, propValue] = Object.entries(props)[0];
      const cssPropertyName = decamelizeCssProperty(propName);
      describe(propName, () => {
        it(`should apply to the CSS "${cssPropertyName}" property`, () => {
          mount(
            <Text id="test" {...props}>
              Text
            </Text>,
          );
          cy.get('#test').should('have.css', cssPropertyName, propValue);
        });
      });
    });

    describe('variant', () => {
      it('should use the variant style defined in system.styles.typography.variants', () => {
        mount(
          <Text id="test" variant="heading.1">
            Text
          </Text>,
          testSystem,
        );
        cy.get('#test')
          .should('have.css', 'color', 'rgb(0, 0, 255)')
          .should('have.css', 'font-size', '32px')
          .should('have.css', 'font-weight', '700');
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

        mount(
          <Text
            id="test"
            as="button"
            className="a b"
            styleProps={styleProps}
            styles={styles}
          >
            Text
          </Text>,
          testSystem,
        );
        cy.get('#test')
          .should('have.class', 'a')
          .should('have.class', 'b')
          .should('have.css', 'cursor', 'pointer') // Via style1
          .should('have.css', 'color', 'rgb(0, 0, 255)'); // Via style2
      });
    });
  });
});

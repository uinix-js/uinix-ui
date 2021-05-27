import React from 'react';

import {Text} from '../../../index.js';
import {mount} from '../../utils/index.js';

const system = {
  typography: {
    variants: {
      heading: {
        1: {
          color: 'rgb(0, 0, 255)',
          fontSize: '32px',
          fontWeight: '700',
        },
      },
    },
  },
};

describe('Text', () => {
  describe('Props', () => {
    describe('children', () => {
      it('should render as a span with text content', () => {
        mount(<Text>Text</Text>);
        cy.contains('span', 'Text').should('exist');
      });

      it('should render with React elements', () => {
        mount(
          <Text>
            <strong>Strong</strong>
            Text
          </Text>,
        );
        cy.contains('strong', 'Strong').should('exist');
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
      describe(propName, () => {
        it(`should apply the specified ${propName}`, () => {
          mount(<Text {...props}>Text</Text>);
          const cssPropertyName = propName.replace(
            /[A-Z]/g,
            (match) => `-${match.toLowerCase()}`,
          );
          cy.contains('span', 'Text').should(
            'have.css',
            cssPropertyName,
            propValue,
          );
        });
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
            as="button"
            className="a b"
            styles={styles}
            styleProps={styleProps}
          >
            Text
          </Text>,
          system,
        );
        cy.contains('button', 'Text')
          .should('have.class', 'a')
          .should('have.class', 'b')
          .should('have.css', 'cursor', 'pointer') // Via style1
          .should('have.css', 'color', 'rgb(0, 0, 255)'); // Via style2
      });
    });
  });
});

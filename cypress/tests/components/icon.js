import React from 'react';

import {Icon} from '../../../index.js';
import {mount} from '../../utils/index.js';
import system from '../../fixtures/system.json';

const iconSelector = 'div:has(>svg)';
const icon = 'x';

describe('Icon', () => {
  describe('Errors', () => {
    it('should throw if icon is missing or invalid', () => {
      cy.get('div').should(() => {
        expect(() => mount(<Icon />, system)).to.throw();
        expect(() => mount(<Icon icon="invalid" />, system)).to.throw();
      });
    });
  });

  describe('Props', () => {
    describe('children', () => {
      it('should not render provided children', () => {
        mount(<Icon icon={icon}>Children</Icon>, system);
        cy.get(iconSelector).should('not.contain.text', 'Children');
      });
    });

    describe('icon', () => {
      it('should render the icon as an div element containing an svg element', () => {
        mount(<Icon icon={icon} />, system);
        cy.get(iconSelector).should('contain.html', system.icons[icon]);
      });
    });

    describe('onClick', () => {
      it('should render the icon as a button element containing an svg element if an onClick handler is provided', () => {
        const onClick = cy.spy(console, 'log').as('log');
        mount(<Icon icon={icon} onClick={onClick} />, system);
        cy.get('button:has(>svg)')
          .should('contain.html', system.icons[icon])
          .click()
          .click();
        cy.get('@log').its('callCount').should('equal', 2);
      });
    });

    describe('color', () => {
      it('should apply to the CSS "color" property', () => {
        mount(<Icon icon={icon} color="rgb(255, 0, 0)" />, system);
        cy.get(iconSelector).should('have.css', 'color', 'rgb(255, 0, 0)');
      });
    });

    describe('height', () => {
      it('should apply to the CSS "height" property', () => {
        mount(<Icon icon={icon} height="16px" />, system);
        cy.get(iconSelector).should('have.css', 'height', '16px');
      });
    });

    describe('width', () => {
      it('should apply to the CSS "width" property', () => {
        mount(<Icon icon={icon} width="16px" />, system);
        cy.get(iconSelector).should('have.css', 'width', '16px');
      });
    });

    describe('size', () => {
      it('should apply to the CSS "height" and "width" properties', () => {
        mount(<Icon icon={icon} size="16px" />, system);
        cy.get(iconSelector)
          .should('have.css', 'height', '16px')
          .should('have.css', 'width', '16px');
      });
    });

    describe('Other', () => {
      it('should support independent application of CSS "height" and "width" properties', () => {
        mount(<Icon icon={icon} height="16px" width="24px" />, system);
        cy.get(iconSelector)
          .should('have.css', 'height', '16px')
          .should('have.css', 'width', '24px');
      });

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
          <Icon
            className="a b"
            icon={icon}
            styleProps={styleProps}
            styles={styles}
            variant="Icon.disabled"
          />,
          system,
        );
        cy.get(iconSelector)
          .should('have.class', 'a')
          .should('have.class', 'b')
          .should('have.css', 'cursor', 'pointer') // Via style1
          .should('have.css', 'color', 'rgb(0, 0, 255)') // Via style2
          .should('have.css', 'opacity', '0.3'); // Via variant
      });
    });
  });
});

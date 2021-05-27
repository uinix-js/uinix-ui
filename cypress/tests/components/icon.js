import React from 'react';

import {Icon} from '../../../index.js';
import {mount} from '../../utils/index.js';

const iconSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

const system = {
  icons: {
    x: iconSvg,
  },
  styles: {
    variants: {
      Icon: {
        disabled: {
          opacity: 0.3,
        },
      },
    },
  },
};

const iconSelector = 'div:has(>svg)';

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
        mount(<Icon icon="x">Children</Icon>, system);
        cy.get(iconSelector).should('not.contain.text', 'Children');
      });
    });

    describe('icon', () => {
      it('should render the icon as an div element containing an svg element', () => {
        mount(<Icon icon="x" />, system);
        cy.get(iconSelector).should('contain.html', iconSvg);
      });
    });

    describe('onClick', () => {
      it('should render the icon as a button element containing an svg element if an onClick handler is provided', () => {
        const onClick = cy.spy(console, 'log').as('log');
        mount(<Icon icon="x" onClick={onClick} />, system);
        cy.get('button:has(>svg)')
          .should('contain.html', iconSvg)
          .click()
          .click();
        cy.get('@log').its('callCount').should('eq', 2);
      });
    });

    describe('color', () => {
      it('should apply the specified color', () => {
        mount(<Icon icon="x" color="rgb(255, 0, 0)" />, system);
        cy.get(iconSelector).should('have.css', 'color', 'rgb(255, 0, 0)');
      });
    });

    describe('height', () => {
      it('should apply the specified height', () => {
        mount(<Icon icon="x" height="16px" />, system);
        cy.get(iconSelector)
          .should('have.css', 'height', '16px')
          .should('not.have.css', 'width', '16px');
      });
    });

    describe('width', () => {
      it('should apply the specified width', () => {
        mount(<Icon icon="x" width="16px" />, system);
        cy.get(iconSelector)
          .should('have.css', 'width', '16px')
          .should('have.css', 'height', '16px');
      });
    });

    describe('size', () => {
      it('should apply the specified size to both height and width', () => {
        mount(<Icon icon="x" size="16px" />, system);
        cy.get(iconSelector)
          .should('have.css', 'height', '16px')
          .should('have.css', 'width', '16px');
      });
    });

    describe('Other', () => {
      it('should allow independent application of height and width', () => {
        mount(<Icon icon="x" height="16px" width="24px" />, system);
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
            icon="x"
            styles={styles}
            styleProps={styleProps}
            variant="Icon.disabled"
          />,
          system,
        );
        cy.get(iconSelector)
          .should('have.class', 'a')
          .should('have.class', 'b')
          .should('have.css', 'cursor', 'pointer') // Via style1
          .should('have.css', 'color', 'rgb(0, 0, 255)') // Via style2
          .should('have.css', 'opacity', '0.3'); // Variant
      });
    });
  });
});

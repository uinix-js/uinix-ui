import React from 'react';

import {Icon} from '../../../index.js';
import system from '../../fixtures/test-system.js';
import {mountWithSystem} from '../../utils/index.js';

const icon = 'x';

describe('Icon', () => {
  describe('Props', () => {
    describe('children', () => {
      it('should not render provided children', () => {
        mountWithSystem(
          <Icon id="test" icon={icon}>
            Children
          </Icon>,
          system,
        );
        cy.get('#test').should('not.contain.text', 'Children');
      });
    });

    describe('icon', () => {
      it('should render the icon as an div element containing an svg element', () => {
        mountWithSystem(<Icon id="test" icon={icon} />, system);
        cy.get('#test')
          .should('have.prop', 'nodeName', 'DIV')
          .should('contain.html', system.icons[icon]);
      });

      it('should render nested icons', () => {
        mountWithSystem(<Icon id="test" icon="nested.x" />, system);
        cy.get('#test').should('contain.html', system.icons.nested.x);
      });
    });

    describe('onClick', () => {
      it('should render the icon as a button element containing an svg element if an onClick handler is provided', () => {
        const onClick = cy.spy(console, 'log').as('log');
        mountWithSystem(
          <Icon id="test" icon={icon} onClick={onClick} />,
          system,
        );
        cy.get('#test')
          .should('have.prop', 'nodeName', 'BUTTON')
          .should('contain.html', system.icons[icon])
          .click()
          .click();
        cy.get('@log').its('callCount').should('equal', 2);
      });
    });

    describe('color', () => {
      it('should apply to the CSS "color" property', () => {
        mountWithSystem(
          <Icon id="test" icon={icon} color="rgb(255, 0, 0)" />,
          system,
        );
        cy.get('#test').should('have.css', 'color', 'rgb(255, 0, 0)');
      });

      it('should apply to the CSS "color" property the currentColor of its parent when rendered as a div', () => {
        mountWithSystem(
          <div style={{color: 'rgb(255, 0, 0)'}}>
            <Icon id="test" icon={icon} />
          </div>,
          system,
        );
        cy.get('#test').should('have.css', 'color', 'rgb(255, 0, 0)');
      });

      it('should apply to the CSS "color" property the currentColor of its parent when rendered as a button', () => {
        mountWithSystem(
          <div style={{color: 'rgb(255, 0, 0)'}}>
            <Icon id="test" icon={icon} onClick={console.log} />
          </div>,
          system,
        );
        cy.get('#test').should('have.css', 'color', 'rgb(255, 0, 0)');
      });
    });

    describe('height', () => {
      it('should apply to the CSS "height" property', () => {
        mountWithSystem(<Icon id="test" icon={icon} height="16px" />, system);
        cy.get('#test > svg').should('have.css', 'height', '16px');
      });
    });

    describe('width', () => {
      it('should apply to the CSS "width" property', () => {
        mountWithSystem(<Icon id="test" icon={icon} width="16px" />, system);
        cy.get('#test > svg').should('have.css', 'width', '16px');
      });
    });

    describe('size', () => {
      it('should apply to the CSS "height" and "width" properties', () => {
        mountWithSystem(<Icon id="test" icon={icon} size="16px" />, system);
        cy.get('#test > svg')
          .should('have.css', 'height', '16px')
          .should('have.css', 'width', '16px');
      });
    });

    describe('Other', () => {
      it('should apply default fixed styles', () => {
        mountWithSystem(<Icon id="test" icon={icon} />, system);
        cy.get('#test')
          .should('have.css', 'align-items', 'center')
          .should(
            'have.css',
            'background',
            'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box',
          )
          .should('have.css', 'border', '0px none rgb(0, 0, 0)')
          .should('have.css', 'display', 'flex')
          .should('have.css', 'margin', '0px')
          .should('have.css', 'padding', '0px');
      });

      it('should support independent application of CSS "height" and "width" properties', () => {
        mountWithSystem(
          <Icon id="test" icon={icon} height="16px" width="24px" />,
          system,
        );
        cy.get('#test > svg')
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

        mountWithSystem(
          <Icon
            id="test"
            className="a b"
            icon={icon}
            styleProps={styleProps}
            styles={styles}
            variant="Icon.disabled"
          />,
          system,
        );
        cy.get('#test')
          .should('have.class', 'a')
          .should('have.class', 'b')
          .should('have.css', 'cursor', 'pointer') // Via style1
          .should('have.css', 'color', 'rgb(0, 0, 255)') // Via style2
          .should('have.css', 'opacity', '0.3'); // Via variant
      });

      it('should not support the `as` prop', () => {
        mountWithSystem(<Icon as="p" id="test" icon={icon} />, system);
        cy.get('#test')
          .should('have.prop', 'nodeName', 'DIV')
          .should('not.have.prop', 'nodeName', 'P');
      });
    });
  });
});

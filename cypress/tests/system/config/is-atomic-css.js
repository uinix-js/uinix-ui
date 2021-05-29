import React from 'react';

import {Element} from '../../../../index.js';
import {mount} from '../../../utils/index.js';

const styles = [
  {backgroundColor: 'rgb(225, 225, 225)', padding: '42px'},
  {color: 'rgb(255, 0, 0)'},
  {color: 'rgb(0, 255, 0)'},
];

describe('isAtomicCss', () => {
  it('should not render any className if no styles are provided', () => {
    mount(<Element>Element</Element>);
    cy.contains('div', 'Element').should('have.class', '');
  });

  it('should render a single className if isAtomicCss is false (default value)', () => {
    mount(<Element styles={styles}>Element</Element>);
    cy.contains('div', 'Element').should(($element) => {
      const classNames = $element[0].className.split(' ');
      expect(classNames.length).to.equal(1);
    });
  });

  it('should render multiple classNames based on unique CSS property/values if isAtomicCss is true', () => {
    const system = {
      config: {
        isAtomicCss: true,
      },
    };

    mount(<Element styles={styles}>Element</Element>, system);
    cy.contains('div', 'Element').should(($element) => {
      const classNames = $element[0].className.split(' ');
      expect(classNames.length).to.equal(3);
    });
  });
});

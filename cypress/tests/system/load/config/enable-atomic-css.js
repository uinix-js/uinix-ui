import React from 'react';

import {Element} from '../../../../../index.js';
import {mountWithSystem} from '../../../../utils/mount-with-system.js';

const styles = [
  {backgroundColor: 'rgb(225, 225, 225)', padding: '42px'},
  {color: 'rgb(255, 0, 0)'},
  {color: 'rgb(0, 255, 0)'},
];

describe('config.enableAtomicCss', () => {
  it('should not render any className if no styles are provided', () => {
    mountWithSystem(<Element id="test">Element</Element>);
    cy.get('#test').should('have.class', '');
  });

  it('should render a single className if enableAtomicCss is false (default value)', () => {
    mountWithSystem(
      <Element id="test" styles={styles}>
        Element
      </Element>,
    );
    cy.get('#test').should(($element) => {
      const classNames = $element[0].className.split(' ');
      expect(classNames.length).to.equal(1);
    });
  });

  it('should render multiple classNames based on unique CSS property/values if enableAtomicCss is true', () => {
    const config = {
      enableAtomicCss: true,
    };

    mountWithSystem(
      <Element id="test" styles={styles}>
        Element
      </Element>,
      {},
      config,
    );
    cy.get('#test').should(($element) => {
      const classNames = $element[0].className.split(' ');
      expect(classNames.length).to.equal(3);
    });
  });
});

import React from 'react';

import {Element} from '../../../../index.js';
import {hasKeyframesChainer, mountWithSystem} from '../../../utils/index.js';

const config = {
  responsiveCssProperties: ['animation', 'animationName', 'margin'],
};

const system = {
  styles: {
    breakpoints: ['480px', '768px'],
  },
  theme: {
    animations: {
      a: '2s ease-in-out 0s infinite normal none running none',
      nested: {
        b: '4s ease-in-out 0s infinite normal none running none',
      },
    },
    keyframes: {
      a: {
        '0%': {opacity: 'invisible'},
        '50%': {opacity: 'visible'},
        '100%': {opacity: 'invisible'},
      },
      nested: {
        b: {
          '0%': {opacity: 'invisible'},
          '100%': {opacity: 'visible'},
        },
      },
    },
    spacings: {
      s: '4px',
      m: '8px',
      l: '16px',
      unitless: 42,
      nested: {
        unitless: 21,
      },
    },
  },
};

const viewportHeight = 400;
const viewportWidths = [300, 500, 800]; // Covering all situations specified in system.styles.breakpoints

describe('Responsive values', () => {
  it('should apply responsive styles matching breakpoints for unnested values', () => {
    const styles = {
      margin: ['s', 'm', 'l'],
    };
    const {spacings} = system.theme;

    mountWithSystem(
      <Element id="test" styles={styles}>
        Element
      </Element>,
      system,
      config,
    );
    cy.viewport(viewportWidths[0], viewportHeight);
    cy.get('#test').should('have.css', 'margin', spacings.s);

    cy.viewport(viewportWidths[1], viewportHeight);
    cy.get('#test').should('have.css', 'margin', spacings.m);

    cy.viewport(viewportWidths[2], viewportHeight);
    cy.get('#test').should('have.css', 'margin', spacings.l);
  });

  it('should apply responsive styles matching breakpoints and support nested/negative/unitless values', () => {
    const styles = {
      margin: ['-unitless', 'nested.unitless', '-nested.unitless'],
    };
    const {spacings} = system.theme;

    mountWithSystem(
      <Element id="test" styles={styles}>
        Element
      </Element>,
      system,
      config,
    );
    cy.viewport(viewportWidths[0], viewportHeight);
    cy.get('#test').should('have.css', 'margin', `-${spacings.unitless}px`);

    cy.viewport(viewportWidths[1], viewportHeight);
    cy.get('#test').should(
      'have.css',
      'margin',
      `${spacings.nested.unitless}px`,
    );

    cy.viewport(viewportWidths[2], viewportHeight);
    cy.get('#test').should(
      'have.css',
      'margin',
      `-${spacings.nested.unitless}px`,
    );
  });

  it('should apply responsive animation styles matching breakpoints and support nested values', () => {
    const styles = {
      animation: ['a', 'nested.b', 'a'],
    };
    const {animations} = system.theme;

    mountWithSystem(
      <Element id="test" styles={styles}>
        Element
      </Element>,
      system,
      config,
    );
    cy.viewport(viewportWidths[0], viewportHeight);
    cy.get('#test').should('have.css', 'animation', animations.a);

    cy.viewport(viewportWidths[1], viewportHeight);
    cy.get('#test').should('have.css', 'animation', animations.nested.b);

    cy.viewport(viewportWidths[2], viewportHeight);
    cy.get('#test').should('have.css', 'animation', animations.a);
  });

  it('should create and apply responsive keyframes rules matching breakpoints and support nested values', () => {
    const styles = {
      animationName: ['a', 'nested.b', 'a'],
    };

    mountWithSystem(
      <Element id="test" styles={styles}>
        Element
      </Element>,
      system,
      config,
    );
    cy.viewport(viewportWidths[0], viewportHeight);
    cy.get('#test').should(hasKeyframesChainer);

    cy.viewport(viewportWidths[1], viewportHeight);
    cy.get('#test').should(hasKeyframesChainer);

    cy.viewport(viewportWidths[2], viewportHeight);
    cy.get('#test').should(hasKeyframesChainer);
  });
});

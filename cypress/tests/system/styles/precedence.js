import React from 'react';

import {Element} from '../../../../index.js';
import {mountWithSystem} from '../../../utils/mount-with-system.js';

const config = {
  elementShorthandPropsMapping: {
    color: ['color'],
  },
};

const system = {
  styles: {
    variants: {
      variant: {
        color: 'rgb(40, 0, 0)',
      },
    },
  },
};

// In descending order of precendence/importance
const styleProps = [
  {
    name: 'style',
    value: {color: 'rgb(10, 0, 0)'},
  },
  {
    name: 'color', // Shorthand prop
    value: 'rgb(20, 0, 0)',
  },
  {
    name: 'styles',
    value: {color: 'rgb(30, 0, 0)'},
  },
  {
    name: 'styleVariant',
    value: 'variant',
  },
];

const getProps = (styleProps) =>
  Object.fromEntries(styleProps.map(({name, value}) => [name, value]));

describe('Precendence', () => {
  it('should take style props precedence in the order of style > variant > shorthandProps > styles', () => {
    // Include all styleProps and assert that the highest precendence style is applied.  Remove the highest precedence styleProp in the next assertions.

    // style prop takes precendence
    mountWithSystem(
      <Element id="test" {...getProps([...styleProps])}>
        Element
      </Element>,
      system,
      config,
    );
    cy.get('#test').should('have.css', 'color', 'rgb(10, 0, 0)');

    // Variant prop takes precendence
    mountWithSystem(
      <Element id="test" {...getProps(styleProps.slice(1))}>
        Element
      </Element>,
      system,
      config,
    );
    cy.get('#test').should('have.css', 'color', 'rgb(20, 0, 0)');

    // Shorthand prop takes precendence
    mountWithSystem(
      <Element id="test" {...getProps(styleProps.slice(2))}>
        Element
      </Element>,
      system,
      config,
    );
    cy.get('#test').should('have.css', 'color', 'rgb(30, 0, 0)');

    // Styles prop takes precendence
    mountWithSystem(
      <Element id="test" {...getProps(styleProps.slice(3))}>
        Element
      </Element>,
      system,
      config,
    );
    cy.get('#test').should('have.css', 'color', 'rgb(40, 0, 0)');
  });
});

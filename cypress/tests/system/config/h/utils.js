import {
  Element,
  Icon,
  Layout,
  Text,
  load,
  merge,
} from '../../../../../index.js';
import system from '../../../../fixtures/test-system.js';

export {assert, createCustomElement};

const createCustomElement = (h) => {
  load(
    merge(system)({
      config: {
        h,
      },
    }),
  );

  return () =>
    h('main', {}, [
      h(
        'h1',
        {
          className: 'a b c',
          id: 'heading',
        },
        'Heading',
      ),
      Layout({
        id: 'layout',
        align: 'center',
        spacing: 'm',
        styles: [
          {
            padding: 'm',
          },
        ],
        children: [
          Element({
            id: 'element',
            children: 'Element',
            color: 'brand.primary',
          }),
          Text({
            id: 'text',
            children: 'Text',
            fontSize: 'xl',
          }),
          Icon({
            id: 'icon',
            children: 'Icon',
            color: 'brand.primary',
            icon: 'x',
            size: 'icon.m',
          }),
        ],
      }),
    ]);
};

const assert = (options = {}) => {
  const {
    // some hyperscript functions do not support SVG!
    excludeIconAssertion = false,
  } = options;

  cy.get('#heading').should('contain', 'Heading').should('have.class', 'a b c');

  cy.get('#layout').should('have.css', 'padding', '16px');

  cy.get('#element')
    .should('contain', 'Element')
    .should('have.css', 'margin-right', '16px');

  cy.get('#text')
    .should('have.css', 'font-size', '40px')
    .should('contain', 'Text')
    .should('have.css', 'margin-right', '16px');

  if (!excludeIconAssertion) {
    cy.get('#icon')
      .should('have.css', 'color', 'rgb(0, 0, 255)')
      .should('contain.html', system.icons.x)
      .should('not.have.css', 'margin-right', '16px');
  }
};

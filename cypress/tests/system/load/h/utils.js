import {Element, Icon, Layout, Text, loadSystem} from '../../../../../index.js';
import system from '../../../../fixtures/test-system.js';

export const createCustomElement = (h) => {
  loadSystem({h, system});

  const CustomElement = ({x, ...rest}) =>
    h('blockquote', rest, `Custom Element: ${x}`);

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
        as: 'section',
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
            as: 'a',
            href: 'https://uinix.dev/',
            children: 'Element',
            color: 'brand.primary',
          }),
          Element({
            id: 'custom',
            as: CustomElement,
            children: 'Custom',
            x: 'x',
          }),
          Text({
            id: 'text',
            as: 'p',
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

export const assert = (options = {}) => {
  const {
    // Some hyperscript functions do not support SVG!
    excludeIconAssertion = false,
  } = options;

  cy.get('#heading')
    .should('have.prop', 'nodeName', 'H1')
    .should('have.html', 'Heading')
    .should('have.class', 'a b c');

  cy.get('#layout')
    .should('have.prop', 'nodeName', 'SECTION')
    .should('have.css', 'padding', '16px');

  cy.get('#element')
    .should('have.prop', 'nodeName', 'A')
    .should('have.prop', 'href', 'https://uinix.dev/')
    .should('have.html', 'Element')
    .should('have.css', 'margin-right', '16px');

  cy.get('#custom')
    .should('have.prop', 'nodeName', 'BLOCKQUOTE')
    .should('have.html', 'Custom Element: x');

  cy.get('#text')
    .should('have.prop', 'nodeName', 'P')
    .should('have.html', 'Text')
    .should('have.css', 'font-size', '40px')
    .should('have.css', 'margin-right', '16px');

  if (!excludeIconAssertion) {
    cy.get('#icon')
      .should('contain.html', system.icons.x)
      .should('have.css', 'color', 'rgb(0, 0, 255)')
      .should('not.have.css', 'margin-right', '16px');
  }
};

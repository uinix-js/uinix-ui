import {mount} from '@cypress/react';
import React, {createElement as h} from 'react';

import {createSystem, load, useSystem} from '../../../../index.js';
import defaultSystem from '../../../fixtures/default-system.js';
import system from '../../../fixtures/test-system.js';

const CustomElement = () => {
  const system = useSystem();
  cy.wrap(system).as('system');
  return <pre>{JSON.stringify(system, null, 2)}</pre>;
};

describe('load', () => {
  // Skipping because of : https://github.com/cypress-io/cypress/issues/16635
  it.skip('should throw if system is not loaded when using system components', () => {
    expect(() => mount(<CustomElement />)).to.throw();
  });

  it('should load the default system if no system is provided', () => {
    load({h});
    mount(<CustomElement />);

    cy.get('@system').should('deep.equal', createSystem(defaultSystem));
  });

  it('should load the provided system', () => {
    load({h, system});
    mount(<CustomElement />);

    cy.get('@system').should('deep.equal', createSystem(system));
  });
});

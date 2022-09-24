import {mount} from '@cypress/react';
import React, {createElement as h} from 'react';

import {createSystem, loadSystem, useSystem} from '../../../../index.js';
import system from '../../../fixtures/test-system.js';

function CustomElement() {
  const system = useSystem();
  cy.wrap(system).as('system');
  return <pre>{JSON.stringify(system, null, 2)}</pre>;
}

describe('loadSystem', () => {
  // Skipping because of : https://github.com/cypress-io/cypress/issues/16635
  it.skip('should throw if system is not loaded when using system components', () => {
    expect(() => mount(<CustomElement />)).to.throw();
  });

  it('should load the default system if no system is provided', () => {
    loadSystem({h});
    mount(<CustomElement />);

    cy.get('@system').should('deep.equal', createSystem());
  });

  it('should load the provided system', () => {
    loadSystem({h, system});
    mount(<CustomElement />);

    cy.get('@system').should('deep.equal', createSystem(system));
  });
});

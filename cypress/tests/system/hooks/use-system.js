import {mount} from '@cypress/react';
import React, {createElement as h} from 'react';

import {createSystem, loadSystem, useSystem} from '../../../../index.js';
import system from '../../../fixtures/test-system.js';

function CustomElement() {
  const system = useSystem();
  cy.wrap(system).as('system');
  return <pre>{JSON.stringify(system, null, 2)}</pre>;
}

describe('useSystem', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useSystem()).to.throw();
  });

  it('should retrieve the entire system', () => {
    loadSystem({h, system});
    mount(<CustomElement />);

    cy.get('@system').should('deep.equal', createSystem(system));
  });
});

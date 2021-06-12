import {mount} from '@cypress/react';
import React from 'react';

import {createSystem, load, useSystem} from '../../../../index.js';
import defaultSystem from '../../../fixtures/default-system.js';
import testSystem from '../../../fixtures/test-system.js';

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

  it('should load the default system if nothing is provided', () => {
    load();
    mount(<CustomElement />);
    cy.get('@system').should('deep.equal', createSystem(defaultSystem));
  });

  it('should load the provided system', () => {
    load(testSystem);
    mount(<CustomElement />);
    cy.get('@system').should('deep.equal', createSystem(testSystem));
  });
});

import React from 'react';

import {createSystem, useSystem} from '../../../index.js';
import testSystem from '../../fixtures/test-system.js';
import {mount} from '../../utils/index.js';

const CustomElement = () => {
  const system = useSystem();
  cy.wrap(system).as('system');
  return <pre>{JSON.stringify(system, null, 2)}</pre>;
};

describe('useSystem', () => {
  it('should retrieve the entire system', () => {
    mount(<CustomElement />, testSystem);
    cy.get('@system').should('deep.equal', createSystem(testSystem));
  });
});

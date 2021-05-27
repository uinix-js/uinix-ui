import React from 'react';

import {createSystem, useSystem} from '../../../index.js';
import {mount} from '../../utils/index.js';

const CustomElement = () => {
  const system = useSystem();
  cy.wrap(system).as('system');
  return <pre>{JSON.stringify(system, null, 2)}</pre>;
};

describe('useSystem', () => {
  it('should retrieve the entire system', () => {
    cy.fixture('system').then((system) => {
      mount(<CustomElement />, system);
      cy.get('@system').should('deep.equal', createSystem(system));
    });
  });
});

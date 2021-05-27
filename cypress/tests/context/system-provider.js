import {mount as cypressMount} from '@cypress/react';
import React from 'react';

import {createSystem, SystemProvider, useSystem} from '../../../index.js';

const CustomElement = () => {
  const system = useSystem();
  cy.wrap(system).as('system');
  return <pre>{JSON.stringify(system, null, 2)}</pre>;
};

describe('SystemProvider', () => {
  it('should return the default system from useSystem if not wrapped in a SystemProvider', () => {
    cypressMount(<CustomElement />);
    cy.fixture('defaults').then((defaultSystem) => {
      cy.get('@system').should('deep.equal', defaultSystem);
    });
  });

  it('should return the provided system from useSystem if wrapped in a SystemProvider', () => {
    cy.fixture('system').then((system) => {
      cypressMount(
        <SystemProvider system={system}>
          <CustomElement />
        </SystemProvider>,
      );
      cy.get('@system').should('deep.equal', createSystem(system));
    });
  });
});

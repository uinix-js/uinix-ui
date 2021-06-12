import {mount} from '@cypress/react';
import React from 'react';

import {
  Element,
  SystemProvider,
  createSystem,
  useSystem,
} from '../../../index.js';
import defaultSystem from '../../fixtures/default-system.js';
import testSystem from '../../fixtures/test-system.js';

const CustomElement = () => {
  const system = useSystem();
  cy.wrap(system).as('system');
  return <pre>{JSON.stringify(system, null, 2)}</pre>;
};

describe('SystemProvider', () => {
  it('should return the default system from useSystem if not wrapped in a SystemProvider', () => {
    mount(<CustomElement />);
    cy.get('@system').should('deep.equal', defaultSystem);
  });

  // Skipping: https://github.com/cypress-io/cypress/issues/16635
  it.skip('should throw if system.config.h is not specified when using system components', () => {
    const system = {
      config: {},
    };

    cy.on('uncaught:exception', (error) => {
      expect(error.message).to.include('h is not a function');
      return false;
    });

    mount(
      <SystemProvider system={system}>
        <Element>Element</Element>
      </SystemProvider>,
    );
  });

  it('should return the provided system from useSystem if wrapped in a SystemProvider', () => {
    mount(
      <SystemProvider system={testSystem}>
        <CustomElement />
      </SystemProvider>,
    );
    cy.get('@system').should('deep.equal', createSystem(testSystem));
  });
});

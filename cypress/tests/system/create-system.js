import {mount} from '@cypress/react';
import React from 'react';

import {useSystem} from '../../../lib/system/hooks.js';

function CustomElement() {
  const system = useSystem();
  cy.wrap(system).as('system');
  return <pre>{JSON.stringify(system, null, 2)}</pre>;
}

describe('createSystem', () => {
  // Skipping because of : https://github.com/cypress-io/cypress/issues/16635
  it.skip('should throw if system is not loaded when using system components', () => {
    expect(() => mount(<CustomElement />)).to.throw();
  });
});

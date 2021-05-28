import {merge} from 'uinix-fp';

import {createSystem} from '../../../index.js';

describe('createSystem', () => {
  it('should create a default system', () => {
    cy.fixture('defaults').then((defaultSystem) => {
      expect(createSystem()).to.deep.equal(defaultSystem);
    });
  });

  it('should deepmerge the provided system', () => {
    cy.fixture('defaults').then((defaultSystem) => {
      cy.fixture('system').then((system) => {
        expect(createSystem(system)).to.deep.equal(
          merge(defaultSystem)(system),
        );
      });
    });
  });
});

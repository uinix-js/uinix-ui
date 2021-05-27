import {merge} from 'uinix-fp';

import {createConfig} from '../../../index.js';

describe('createConfig', () => {
  it('should create default config', () => {
    cy.fixture('defaults').then((defaults) => {
      expect(createConfig()).to.deep.equal(defaults.config);
    });
  });

  it('should deepmerge provided config', () => {
    cy.fixture('defaults').then((defaults) => {
      cy.fixture('system').then(({config}) => {
        expect(createConfig(config)).to.deep.equal(
          merge(defaults.config)(config),
        );
      });
    });
  });
});

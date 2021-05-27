import {merge} from 'uinix-fp';
import {createOptions} from '../../../index.js';

describe('createOptions', () => {
  it('should create default options', () => {
    cy.fixture('defaults').then((defaults) => {
      expect(createOptions()).to.deep.equal(defaults.options);
    });
  });

  it('should deepmerge provided options', () => {
    cy.fixture('defaults').then((defaults) => {
      cy.fixture('system').then(({options}) => {
        expect(createOptions(options)).to.deep.equal(
          merge(defaults.options)(options),
        );
      });
    });
  });
});

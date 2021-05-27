import {merge} from 'uinix-fp';

import {createTypography} from '../../../index.js';

describe('createTypography', () => {
  it('should create default typography', () => {
    cy.fixture('defaults').then((defaults) => {
      expect(createTypography()).to.deep.equal(defaults.typography);
    });
  });

  it('should deepmerge provided typography', () => {
    cy.fixture('defaults').then((defaults) => {
      cy.fixture('system').then(({typography}) => {
        expect(createTypography(typography)).to.deep.equal(
          merge(defaults.typography)(typography),
        );
      });
    });
  });
});

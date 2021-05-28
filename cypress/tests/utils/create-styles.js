import {merge} from 'uinix-fp';

import {createStyles} from '../../../index.js';

describe('createStyles', () => {
  it('should create default styles', () => {
    cy.fixture('defaults').then((defaults) => {
      expect(createStyles()).to.deep.equal(defaults.styles);
    });
  });

  it('should deepmerge provided styles', () => {
    cy.fixture('defaults').then((defaults) => {
      cy.fixture('system').then(({styles}) => {
        expect(createStyles(styles)).to.deep.equal(
          merge(defaults.styles)(styles),
        );
      });
    });
  });
});

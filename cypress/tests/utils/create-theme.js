import {merge} from 'uinix-fp';
import {createTheme} from '../../../index.js';

describe('createTheme', () => {
  it('should create default theme', () => {
    cy.fixture('defaults').then((defaults) => {
      expect(createTheme()).to.deep.equal(defaults.theme);
    });
  });

  it('should deepmerge provided theme', () => {
    cy.fixture('defaults').then((defaults) => {
      cy.fixture('system').then(({theme}) => {
        expect(createTheme(theme)).to.deep.equal(merge(defaults.theme)(theme));
      });
    });
  });
});

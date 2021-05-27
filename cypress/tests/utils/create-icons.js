import {createIcons} from '../../../index.js';

describe('createIcons', () => {
  it('should return empty object as default icons', () => {
    cy.fixture('defaults').then((defaults) => {
      expect(createIcons()).to.deep.equal(defaults.icons);
    });
  });

  it('should simply passthrough provided icons', () => {
    cy.fixture('system').then(({icons}) => {
      expect(createIcons(icons)).to.equal(icons);
    });
  });
});

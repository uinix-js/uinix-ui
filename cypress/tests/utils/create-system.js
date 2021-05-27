import {merge} from 'uinix-fp';
import {createStyles, createSystem} from '../../../index.js';

describe('createSystem', () => {
  it('should create default system', () => {
    cy.fixture('defaults').then((defaultSystem) => {
      expect(createSystem()).to.deep.equal(defaultSystem);
    });
  });

  it('should deepmerge provided system', () => {
    cy.fixture('defaults').then((defaultSystem) => {
      cy.fixture('system').then((system) => {
        const mergedSystem = merge(defaultSystem)(system);
        const mergedStyles = createStyles(system.styles, system.typography);
        expect(createSystem(system)).to.deep.equal({
          ...mergedSystem,
          styles: mergedStyles,
        });
      });
    });
  });
});

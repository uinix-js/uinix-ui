import {createRenderer} from '../../../lib/renderer/create-renderer.js';

describe('createRenderer', () => {
  it('should not throw when initialized with a valid system', () => {
    cy.fixture('system').then((system) => {
      expect(() => createRenderer(system)).to.not.throw();
    });
  });

  it('has features and behaviors tested in other test suites (i.e. components/, context/, system/)', () => {});
});

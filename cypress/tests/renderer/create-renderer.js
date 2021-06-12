import {createRenderer} from '../../../lib/renderer/create-renderer.js';
import testSystem from '../../fixtures/test-system.js';

describe('createRenderer', () => {
  it('should not throw when initialized with a valid system', () => {
    expect(() => createRenderer(testSystem)).to.not.throw();
  });

  it('is tested in components/, context/, system/', () => {});
});

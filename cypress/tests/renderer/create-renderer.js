import {createRenderer} from '../../../lib/renderer/create-renderer.js';
import config from '../../fixtures/test-config.js';
import system from '../../fixtures/test-system.js';

describe('createRenderer', () => {
  it('should not throw when initialized with a valid system and config', () => {
    expect(() => createRenderer(system, config)).to.not.throw();
  });

  it('is tested in components/, system/', () => {});
});

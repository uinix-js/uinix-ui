import {merge} from 'uinix-fp';

import {createConfig} from '../../../../index.js';
import defaultSystem from '../../../fixtures/default-system.js';
import testSystem from '../../../fixtures/test-system.js';

describe('createConfig', () => {
  it('should create default config', () => {
    expect(createConfig()).to.deep.equal(defaultSystem.config);
  });

  it('should deepmerge provided config', () => {
    expect(createConfig(testSystem.config)).to.deep.equal(
      merge(defaultSystem.config)(testSystem.config),
    );
  });
});

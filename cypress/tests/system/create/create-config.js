import {merge} from 'uinix-fp';

import {createConfig} from '../../../../index.js';
import defaultConfig from '../../../fixtures/default-config.js';
import config from '../../../fixtures/test-config.js';

describe('createConfig', () => {
  it('should create default config', () => {
    expect(createConfig()).to.deep.equal(defaultConfig);
  });

  it('should deepmerge provided config', () => {
    expect(createConfig(config)).to.deep.equal(merge(defaultConfig)(config));
  });
});

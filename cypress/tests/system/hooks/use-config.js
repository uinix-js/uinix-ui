import {createElement as h} from 'react';

import {load} from '../../../../index.js';
import {useConfig} from '../../../../lib/system/hooks.js';
import defaultConfig from '../../../fixtures/default-config.js';
import config from '../../../fixtures/test-config.js';

describe('useConfig', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useConfig()).to.throw();
  });

  it('should return the default config for a default system', () => {
    load(h);
    expect(useConfig()).deep.equal(defaultConfig);
  });

  it('should return the provided config', () => {
    load(h, undefined, config);
    expect(useConfig()).deep.equal(config);
  });
});

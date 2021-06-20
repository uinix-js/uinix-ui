import {createElement as h} from 'react';

import {useH} from '../../../../lib/system/hooks.js';
import {load} from '../../../../lib/system/load.js';

describe('useH', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useH()).to.throw();
  });

  it('should retrieve the provided h (React.createElement) function', () => {
    load(h);
    expect(useH()).equal(h);
  });
});

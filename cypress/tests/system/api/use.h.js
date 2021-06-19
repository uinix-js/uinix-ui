import {createElement as h} from 'react';

import {load, useH} from '../../../../lib/system/api.js';

describe('useH', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useH()).to.throw();
  });

  it('should retrieve the provided h (React.createElement) function', () => {
    load(h);
    expect(useH()).equal(h);
  });
});

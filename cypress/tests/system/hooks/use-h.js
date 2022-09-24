import {createElement as h} from 'react';

import {loadSystem} from '../../../../index.js';
import {useH} from '../../../../lib/system/hooks.js';

describe('useH', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useH()).to.throw();
  });

  it('should retrieve the provided h (React.createElement) function', () => {
    loadSystem({h});
    expect(useH()).equal(h);
  });
});

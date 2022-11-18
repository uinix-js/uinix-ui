import {createElement as h} from 'react';

import {createSystem} from '../../../../index.js';
import {useH} from '../../../../lib/system/hooks.js';

describe('useH', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useH()).to.throw();
  });

  it('should retrieve the provided h (React.createElement) function', () => {
    createSystem({h});
    expect(useH()).equal(h);
  });
});

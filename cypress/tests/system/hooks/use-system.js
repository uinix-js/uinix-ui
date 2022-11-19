import {useSystem} from '../../../../lib/system/hooks.js';

describe('useSystem', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useSystem()).to.throw();
  });
});

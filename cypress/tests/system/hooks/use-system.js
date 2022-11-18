import {useSystem} from '../../../../index.js';

describe('useSystem', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useSystem()).to.throw();
  });
});

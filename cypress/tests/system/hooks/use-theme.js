import {useTheme} from '../../../../index.js';

describe('useTheme', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useTheme()).to.throw();
  });
});

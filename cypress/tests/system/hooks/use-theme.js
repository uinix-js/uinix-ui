import {useTheme} from '../../../../lib/system/hooks.js';

describe('useTheme', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useTheme()).to.throw();
  });
});

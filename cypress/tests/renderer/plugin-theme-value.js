import {themeValue} from '../../../lib/renderer/plugin-theme-value.js';

describe('themeValue', () => {
  it('should not throw when initialized', () => {
    expect(() => themeValue()).to.not.throw();
  });

  it('is tested in system/theme/', () => {});
});

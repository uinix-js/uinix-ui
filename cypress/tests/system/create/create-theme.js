import {merge} from 'uinix-fp';
import themeSpec from 'uinix-theme-spec';

import {createTheme} from '../../../../index.js';
import defaultSystem from '../../../fixtures/default-system.js';
import system from '../../../fixtures/test-system.js';

describe('createTheme', () => {
  it('should create default theme', () => {
    expect(createTheme({}, themeSpec)).to.deep.equal(defaultSystem.theme);
  });

  it('should deepmerge provided theme', () => {
    expect(createTheme(system.theme, themeSpec)).to.deep.equal(
      merge(defaultSystem.theme)(system.theme),
    );
  });
});

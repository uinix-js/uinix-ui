import {merge} from 'uinix-fp';

import {createTheme} from '../../../../index.js';
import defaultSystem from '../../../fixtures/default-system.js';
import testSystem from '../../../fixtures/test-system.js';

describe('createTheme', () => {
  it('should create default theme', () => {
    expect(createTheme()).to.deep.equal(defaultSystem.theme);
  });

  it('should deepmerge provided theme', () => {
    expect(createTheme(testSystem.theme)).to.deep.equal(
      merge(defaultSystem.theme)(testSystem.theme),
    );
  });
});

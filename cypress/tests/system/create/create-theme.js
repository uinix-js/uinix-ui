import {merge} from 'uinix-fp';

import {createTheme} from '../../../../index.js';
import defaultSystem from '../../../fixtures/default-system.js';
import system from '../../../fixtures/test-system.js';

describe('createTheme', () => {
  it('should create default theme', () => {
    expect(createTheme()).to.deep.equal(defaultSystem.theme);
  });

  it('should deepmerge provided theme', () => {
    expect(createTheme(system.theme)).to.deep.equal(
      merge(defaultSystem.theme)(system.theme),
    );
  });
});

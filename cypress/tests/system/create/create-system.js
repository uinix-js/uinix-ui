import {merge} from 'uinix-fp';
import themeSpec from 'uinix-theme-spec';

import {createSystem} from '../../../../index.js';
import defaultSystem from '../../../fixtures/default-system.js';
import system from '../../../fixtures/test-system.js';

describe('createSystem', () => {
  it('should create a default system', () => {
    expect(createSystem({themeSpec})).to.deep.equal(defaultSystem);
  });

  it('should deepmerge the provided system', () => {
    expect(createSystem(system)).to.deep.equal(merge(defaultSystem)(system));
  });
});

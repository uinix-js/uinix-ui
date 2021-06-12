import {merge} from 'uinix-fp';

import {createSystem} from '../../../index.js';
import defaultSystem from '../../fixtures/default-system.js';
import testSystem from '../../fixtures/test-system.js';

describe('createSystem', () => {
  it('should create a default system', () => {
    expect(createSystem()).to.deep.equal(defaultSystem);
  });

  it('should deepmerge the provided system', () => {
    expect(createSystem(testSystem)).to.deep.equal(
      merge(defaultSystem)(testSystem),
    );
  });
});

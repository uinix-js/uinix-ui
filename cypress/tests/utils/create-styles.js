import {merge} from 'uinix-fp';

import {createStyles} from '../../../index.js';
import defaultSystem from '../../fixtures/default-system.js';
import testSystem from '../../fixtures/test-system.js';

describe('createStyles', () => {
  it('should create default styles', () => {
    expect(createStyles()).to.deep.equal(defaultSystem.styles);
  });

  it('should deepmerge provided styles', () => {
    expect(createStyles(testSystem.styles)).to.deep.equal(
      merge(defaultSystem.styles)(testSystem.styles),
    );
  });
});

import {merge} from 'uinix-fp';

import {createStyles} from '../../../../index.js';
import defaultSystem from '../../../fixtures/default-system.js';
import system from '../../../fixtures/test-system.js';

describe('createStyles', () => {
  it('should create default styles', () => {
    expect(createStyles()).to.deep.equal(defaultSystem.styles);
  });

  it('should deepmerge provided styles', () => {
    expect(createStyles(system.styles)).to.deep.equal(
      merge(defaultSystem.styles)(system.styles),
    );
  });
});

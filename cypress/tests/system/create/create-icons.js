import {createIcons} from '../../../../index.js';
import defaultSystem from '../../../fixtures/default-system.js';
import system from '../../../fixtures/test-system.js';

describe('createIcons', () => {
  it('should return empty object as default icons', () => {
    expect(createIcons()).to.deep.equal(defaultSystem.icons);
  });

  it('should simply passthrough provided icons', () => {
    expect(createIcons(system.icons)).to.equal(system.icons);
  });
});

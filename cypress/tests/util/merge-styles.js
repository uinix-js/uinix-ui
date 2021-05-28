import {mergeStyles} from '../../../lib/util/merge-styles.js';

describe('mergeStyles', () => {
  const style1 = {color: 'red'};
  const style2 = () => ({color: 'blue'});

  it('should merge styles', () => {
    expect(mergeStyles([style1, null, style2])).to.deep.equal([
      style1,
      null,
      style2,
    ]);
  });

  it('should flatten nested styles', () => {
    expect(mergeStyles([style1, [style1, style2], null])).to.deep.equal([
      style1,
      style1,
      style2,
      null,
    ]);
  });
});

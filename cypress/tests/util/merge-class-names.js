import {mergeClassNames} from '../../../lib/util/merge-class-names.js';

describe('mergeClassNames', () => {
  it('should merge classnames', () => {
    expect(mergeClassNames(['a', 'b', 'c'])).to.equal('a b c');
  });

  it('should filter falsy classnames', () => {
    expect(
      mergeClassNames(['a', '', 'b', null, false, undefined, 'c']),
    ).to.equal('a b c');
  });

  it('should return undefined if merged className is the empty string', () => {
    expect(mergeClassNames([''])).to.equal(undefined);
    expect(mergeClassNames([null, undefined])).to.equal(undefined);
  });
});

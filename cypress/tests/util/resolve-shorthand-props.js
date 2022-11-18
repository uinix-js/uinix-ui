import {resolveShorthandProps} from '../../../lib/util/resolve-shorthand-props.js';

describe('resolveShorthandProps', () => {
  it('should return empty restProps and empty shorthandStyle when provided with empty props and empty shorthandPropsMapping', () => {
    expect(resolveShorthandProps({})({})).to.deep.equal([{}, {}]);
  });

  it('should return the provided props and empty shorthandStyle when provided with non-empty props and empty shorthandPropsMapping', () => {
    expect(resolveShorthandProps({})({a: 42})).to.deep.equal([{a: 42}, {}]);
  });

  it('should return empty props and empty shorthandStyle when provided with empty props and non-empty shorthandPropsMapping', () => {
    expect(resolveShorthandProps({margin: ['m']})({})).to.deep.equal([{}, {}]);
  });

  it('should return props and empty shorthandStyle when provided with non-empty props and non-empty shorthandPropsMapping without matching props', () => {
    expect(resolveShorthandProps({margin: ['m']})({a: 42})).to.deep.equal([
      {a: 42},
      {},
    ]);
  });

  it('should return shorthandStyle for matching props in shorthandPropsMapping and restProps', () => {
    expect(
      resolveShorthandProps({
        margin: ['m'],
        padding: ['p'],
      })({
        a: 42,
        b: true,
        m: '42px',
        p: '24px',
      }),
    ).to.deep.equal([
      {a: 42, b: true},
      {margin: '42px', padding: '24px'},
    ]);
  });

  it('should return shorthandStyle and restProps, with shorthandStyle resolved based on precedence in shorthandPropsMapping', () => {
    expect(
      resolveShorthandProps({
        margin: ['m'],
        marginBottom: ['mb', 'my', 'm'],
        marginLeft: ['ml', 'mx', 'm'],
        marginRight: ['mr', 'mx', 'm'],
        marginTop: ['mt', 'my', 'm'],
      })({
        a: 42,
        b: true,
        mb: '12px',
        mx: '6px',
        my: '24px',
        m: '48px',
      }),
    ).to.deep.equal([
      {a: 42, b: true},
      {
        margin: '48px',
        marginBottom: '12px',
        marginLeft: '6px',
        marginRight: '6px',
        marginTop: '24px',
      },
    ]);
  });
});

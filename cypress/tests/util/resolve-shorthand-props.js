import {resolveShorthandProps} from '../../../lib/util/resolve-shorthand-props.js';

describe('resolveShorthandProps', () => {
  const shorthandPropsMapping = {
    margin: ['m'],
    padding: ['p'],
  };
  const props = {a: 42, b: true};

  const emptyProps = {};
  const emptyShorthandPropsMapping = {};

  it('should resolve empty props with empty shorthandPropsMapping returning empty restProps and empty shorthandStyle', () => {
    expect(
      resolveShorthandProps(emptyShorthandPropsMapping)(emptyProps),
    ).to.deep.equal([{}, {}]);
  });

  it('should resolve non-empty props with empty shorthandPropsMapping returning provided props and empty shorthandStyle', () => {
    expect(
      resolveShorthandProps(emptyShorthandPropsMapping)(props),
    ).to.deep.equal([props, {}]);
  });

  it('should resolve empty props with non-empty shorthandPropsMapping returning empty props and empty shorthandStyle', () => {
    expect(
      resolveShorthandProps(shorthandPropsMapping)(emptyProps),
    ).to.deep.equal([{}, {}]);
  });

  it('should resolve non-empty props with non-empty shorthandPropsMapping returning provided props and empty shorthandStyle if no props are registered in shorthandPropsMapping', () => {
    expect(resolveShorthandProps(shorthandPropsMapping)(props)).to.deep.equal([
      props,
      {},
    ]);
  });

  it('should resolve non-empty props with non-empty shorthandPropsMapping and return styleObject based on matching props defined in shorthandPropsMapping and returning other props in restProps', () => {
    const shorthandPropsMapping = {
      margin: ['m'],
      padding: ['p'],
    };
    const props = {
      a: 42,
      b: true,
      m: '42px',
      p: '24px',
    };

    expect(resolveShorthandProps(shorthandPropsMapping)(props)).to.deep.equal([
      {a: 42, b: true},
      {margin: '42px', padding: '24px'},
    ]);
  });

  it('should resolve and populate shorthandStyle in order of the precedence specified in the shorthandPropsMapping', () => {
    const shorthandPropsMapping = {
      margin: ['m'],
      marginBottom: ['mb', 'my', 'm'],
    };

    expect(
      resolveShorthandProps(shorthandPropsMapping)({
        a: 42,
        b: true,
        m: '42px',
      }),
    ).to.deep.equal([
      {a: 42, b: true},
      {margin: '42px', marginBottom: '42px'},
    ]);

    expect(
      resolveShorthandProps(shorthandPropsMapping)({
        a: 42,
        b: true,
        mb: '12px',
        my: '24px',
        m: '42px',
      }),
    ).to.deep.equal([
      {a: 42, b: true},
      {margin: '42px', marginBottom: '12px'},
    ]);
  });
});

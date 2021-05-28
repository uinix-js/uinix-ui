import {resolveShorthandProps} from '../../../lib/util/resolve-shorthand-props.js';

describe('resolveShorthandProps', () => {
  it('should resolve empty props with empty shorthandPropsMapping', () => {
    const shorthandPropsMapping = {};
    const props = {};

    expect(resolveShorthandProps(shorthandPropsMapping)(props)).to.deep.equal({
      nonShorthandProps: {},
      shorthandPropsStyle: {},
    });
  });

  it('should resolve non-empty props with empty shorthandPropsMapping', () => {
    const shorthandPropsMapping = {};
    const props = {
      a: 42,
      b: true,
    };

    expect(resolveShorthandProps(shorthandPropsMapping)(props)).to.deep.equal({
      nonShorthandProps: {
        a: 42,
        b: true,
      },
      shorthandPropsStyle: {},
    });
  });

  it('should resolve empty props with non-empty shorthandPropsMapping', () => {
    const shorthandPropsMapping = {
      margin: ['m'],
      padding: ['p'],
    };
    const props = {};

    expect(resolveShorthandProps(shorthandPropsMapping)(props)).to.deep.equal({
      nonShorthandProps: {},
      shorthandPropsStyle: {},
    });
  });

  it('should resolve non-empty (non-matching) props with non-empty shorthandPropsMapping', () => {
    const shorthandPropsMapping = {
      margin: ['m'],
      padding: ['p'],
    };
    const props = {
      a: 42,
      b: true,
    };

    expect(resolveShorthandProps(shorthandPropsMapping)(props)).to.deep.equal({
      nonShorthandProps: {
        a: 42,
        b: true,
      },
      shorthandPropsStyle: {},
    });
  });

  it('should resolve non-empty (matching) props with non-empty shorthandPropsMapping and filter matching props from nonShorthandProps while populating shorthandPropsStyle appropriately', () => {
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

    expect(resolveShorthandProps(shorthandPropsMapping)(props)).to.deep.equal({
      nonShorthandProps: {
        a: 42,
        b: true,
      },
      shorthandPropsStyle: {
        margin: '42px',
        padding: '24px',
      },
    });
  });

  it('should resolve and populate shorthandPropsStyle in order of the precedence specified in the shorthandPropsMapping', () => {
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
    ).to.deep.equal({
      nonShorthandProps: {
        a: 42,
        b: true,
      },
      shorthandPropsStyle: {
        margin: '42px',
        marginBottom: '42px',
      },
    });

    expect(
      resolveShorthandProps(shorthandPropsMapping)({
        a: 42,
        b: true,
        mb: '12px',
        my: '24px',
        m: '42px',
      }),
    ).to.deep.equal({
      nonShorthandProps: {
        a: 42,
        b: true,
      },
      shorthandPropsStyle: {
        margin: '42px',
        marginBottom: '12px',
      },
    });
  });
});

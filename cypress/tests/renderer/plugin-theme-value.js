import {
  _resolveThemeValues as resolveThemeValues,
  themeValue,
} from '../../../lib/renderer/plugin-theme-value.js';

describe('themeValue', () => {
  it('should not throw when initialized', () => {
    expect(() => themeValue()).to.not.throw();
  });

  it('is tested in system/theme/', () => {});

  describe('resolveThemeValues', () => {
    it('should return themed style if values do not exist in theme', () => {
      const style = {
        backgroundColor: 'blue',
        padding: 9999,
      };

      const theme = {
        colors: {
          primary: 'red',
        },
        spacings: {
          m: 42,
        },
      };

      expect(resolveThemeValues(style, theme)).to.deep.equal({
        backgroundColor: 'blue',
        padding: 9999,
      });
    });

    it('should resolve a themed style based on provided theme', () => {
      const style = {
        backgroundColor: 'brand',
        padding: 'm',
      };

      const theme = {
        colors: {
          brand: 'red',
        },
        spacings: {
          m: 42,
        },
      };

      expect(resolveThemeValues(style, theme)).to.deep.equal({
        backgroundColor: 'red',
        padding: 42,
      });
    });

    it('should resolve a themed style with nested theme property keys', () => {
      const style = {
        backgroundColor: 'brand.primary',
        padding: 'large.m',
      };

      const theme = {
        colors: {
          brand: {
            primary: 'red',
          },
        },
        spacings: {
          large: {
            m: 42,
          },
        },
      };

      expect(resolveThemeValues(style, theme)).to.deep.equal({
        backgroundColor: 'red',
        padding: 42,
      });
    });

    it('should resolve a negative theme values', () => {
      const style = {
        margin: '-m',
        padding: '-large.m',
      };

      const theme = {
        spacings: {
          m: '42px',
          large: {
            m: 9999,
          },
        },
      };

      expect(resolveThemeValues(style, theme)).to.deep.equal({
        margin: '-42px',
        padding: -9999,
      });
    });

    it('should resolve a themed style with numeric theme property keys', () => {
      const style = {
        marginLeft: 2,
        marginRight: -2,
        marginTop: 'large.2',
        marginBottom: '-large.2',
        margin: -1234,
      };

      const theme = {
        spacings: {
          2: '42px',
          large: {
            2: 9999,
          },
        },
      };

      expect(resolveThemeValues(style, theme)).to.deep.equal({
        marginLeft: '42px',
        marginRight: '-42px',
        marginTop: 9999,
        marginBottom: -9999,
        margin: -1234,
      });
    });
  });
});

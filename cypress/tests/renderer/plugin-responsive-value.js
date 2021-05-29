import {responsiveValue} from '../../../lib/renderer/plugin-responsive-value.js';

describe('responsiveValue', () => {
  it('should not throw when initialized with valid arguments', () => {
    const breakpoints = ['480px', '768px'];
    const responsiveCssProperties = ['color', 'padding', 'margin'];

    expect(() =>
      responsiveValue({breakpoints, responsiveCssProperties}),
    ).to.not.throw();
  });

  it('is tested in system/config/responsive-css-properties.js', () => {});
});

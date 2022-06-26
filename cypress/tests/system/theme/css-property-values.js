import React from 'react';
import defaultThemeSpec from 'uinix-theme-spec';

import {Element} from '../../../../index.js';
import {decamelizeCssProperty, mountWithSystem} from '../../../utils/index.js';

const system = {
  theme: {
    animations: {
      default: '2s ease-in-out 0s infinite normal none running none',
    },
    backgrounds: {
      default:
        'rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0), rgb(0, 0, 255)) repeat scroll 0% 0% / auto padding-box border-box',
    },
    borders: {
      default: '1px solid rgb(255, 0, 0)',
    },
    borderStyles: {
      default: 'dashed',
    },
    borderWidths: {
      default: '4px',
    },
    colors: {
      default: 'rgb(0, 0, 255)',
    },
    filters: {
      default: 'blur(5px)',
    },
    fontFamilies: {
      default: 'impact',
    },
    fontSizes: {
      default: '42px',
    },
    fontWeights: {
      default: '700',
    },
    images: {
      default: 'url("image")',
    },
    keyframes: {
      default: 'slide',
    },
    letterSpacings: {
      default: '20px',
    },
    lineHeights: {
      default: '42px',
    },
    opacities: {
      default: '0.3',
    },
    radii: {
      default: '100%',
    },
    shadows: {
      default: '2px 2px #ff0000',
      boxShadow: 'rgb(255, 0, 0) 2px 2px 0px 0px',
      textShadow: 'rgb(255, 0, 0) 2px 2px 0px',
    },
    sizes: {
      default: '768px',
    },
    spacings: {
      default: '42px',
      gridGap: '42px 42px',
    },
    transforms: {
      default: 'matrix(1, 0, 0, 1, 0, -12)',
    },
    transitions: {
      default: 'all 0.1s ease-in-out 0s',
    },
    zIndices: {
      default: '1',
    },
  },
};

// Required to ensure some computed CSS styles can be enabled and tested
const defaultStyle = {
  border: '1px solid transparent',
};

describe('CSS property values', () => {
  for (const [themeProperty, cssProperties] of Object.entries(
    defaultThemeSpec,
  )) {
    describe(themeProperty, () => {
      for (const cssProperty of cssProperties) {
        it.only(`should apply ${cssProperty} styles accessed via theme.${themeProperty}.default`, () => {
          console.log(cssProperty);
          const styles = {
            ...defaultStyle,
            [cssProperty]: 'default',
          };

          // Due to the way computed CSS styles work, they may evaluate to specific formalized values for the corresponding CSS property.
          const {default: defaultValue, [cssProperty]: specificValue} =
            system.theme[themeProperty];
          const expectedValue = specificValue || defaultValue;

          mountWithSystem(
            <Element id="test" styles={styles}>
              Element
            </Element>,
            system,
          );
          cy.get('#test').should(
            'have.css',
            decamelizeCssProperty(cssProperty),
            expectedValue,
          );
        });
      }
    });
  }
});

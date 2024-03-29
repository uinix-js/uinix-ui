import React from 'react';
import defaultThemeSpec from 'uinix-theme-spec';

import {Element} from '../../../../index.js';
import {decamelizeCssProperty} from '../../../utils/decamelize-css-property.js';
import {mountWithSystem} from '../../../utils/mount-with-system.js';

const system = {
  theme: {
    animations: {
      nested: {
        nested: {
          default: '2s ease-in-out 0s infinite normal none running none',
        },
      },
    },
    backgrounds: {
      nested: {
        nested: {
          default:
            'rgba(0, 0, 0, 0) linear-gradient(45deg, rgb(255, 0, 0), rgb(0, 0, 255)) repeat scroll 0% 0% / auto padding-box border-box',
        },
      },
    },
    borders: {
      nested: {
        nested: {
          default: '1px solid rgb(255, 0, 0)',
        },
      },
    },
    borderStyles: {
      nested: {
        nested: {
          default: 'dashed',
        },
      },
    },
    borderWidths: {
      nested: {
        nested: {
          default: '4px',
        },
      },
    },
    colors: {
      nested: {
        nested: {
          default: 'rgb(0, 0, 255)',
        },
      },
    },
    filters: {
      nested: {
        nested: {
          default: 'blur(5px)',
        },
      },
    },
    fontFamilies: {
      nested: {
        nested: {
          default: 'impact',
        },
      },
    },
    fontSizes: {
      nested: {
        nested: {
          default: '42px',
        },
      },
    },
    fontWeights: {
      nested: {
        nested: {
          default: '700',
        },
      },
    },
    keyframes: {
      nested: {
        nested: {
          default: 'slide',
        },
      },
    },
    letterSpacings: {
      nested: {
        nested: {
          default: '20px',
        },
      },
    },
    lineHeights: {
      nested: {
        nested: {
          default: '42px',
        },
      },
    },
    opacities: {
      nested: {
        nested: {
          default: '0.3',
        },
      },
    },
    radii: {
      nested: {
        nested: {
          default: '100%',
        },
      },
    },
    shadows: {
      nested: {
        nested: {
          default: '2px 2px #ff0000',
          boxShadow: 'rgb(255, 0, 0) 2px 2px 0px 0px',
          textShadow: 'rgb(255, 0, 0) 2px 2px 0px',
        },
      },
    },
    sizes: {
      nested: {
        nested: {
          default: '768px',
        },
      },
    },
    spacings: {
      nested: {
        nested: {
          default: '42px',
          gridGap: '42px 42px',
        },
      },
    },
    transforms: {
      nested: {
        nested: {
          default: 'matrix(1, 0, 0, 1, 0, -12)',
        },
      },
    },
    transitions: {
      nested: {
        nested: {
          default: 'all 0.1s ease-in-out 0s',
        },
      },
    },
    zIndices: {
      nested: {
        nested: {
          default: '1',
        },
      },
    },
  },
};

// Required to ensure some computed CSS styles can be enabled and tested
const defaultStyle = {
  border: '1px solid transparent',
};

// TODO: revisit this test
describe.skip('Nested values', () => {
  for (const [themeProperty, cssProperties] of Object.entries(
    defaultThemeSpec,
  )) {
    describe(themeProperty, () => {
      for (const cssProperty of cssProperties) {
        it(`should apply ${cssProperty} styles accessed via theme.${themeProperty}.nested.nested.default`, () => {
          const styles = {
            ...defaultStyle,
            [cssProperty]: 'nested.nested.default',
          };

          // Due to the way computed CSS styles work, they may evaluate to specific formalized values for the corresponding CSS property.
          const {default: defaultValue, [cssProperty]: specificValue} =
            system.theme[themeProperty].nested.nested;
          const expectedValue = specificValue ?? defaultValue;

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

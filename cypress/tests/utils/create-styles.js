import {merge} from 'uinix-fp';

import {createStyles} from '../../../index.js';

describe('createStyles', () => {
  it('should create default styles', () => {
    cy.fixture('defaults').then((defaults) => {
      expect(createStyles()).to.deep.equal(defaults.styles);
    });
  });

  it('should deepmerge provided styles', () => {
    cy.fixture('defaults').then((defaults) => {
      cy.fixture('system').then(({styles}) => {
        expect(createStyles(styles)).to.deep.equal(
          merge(defaults.styles)(styles),
        );
      });
    });
  });

  it('should merge typography styles if provided', () => {
    cy.fixture('defaults').then((defaults) => {
      cy.fixture('system').then(({styles, typography}) => {
        expect(createStyles(styles)).to.deep.equal(
          merge(defaults.styles)(styles),
        );
        expect(createStyles(styles, typography)).to.deep.equal({
          red: {
            color: 'rgb(255, 0, 0)',
          },
          global: {
            h1: {
              fontSize: '84px',
            },
          },
          variants: {
            Button: {
              primary: {
                color: 'rgb(0, 0, 255)',
                ':focus': {
                  opacity: '0.7',
                  color: 'rgb(0, 0, 125)',
                },
              },
            },
            Card: {
              small: {
                padding: '4px',
              },
            },
            Icon: {
              disabled: {
                opacity: '0.3',
              },
            },
            Text: {
              heading: {
                1: {
                  color: 'rgb(0, 0, 255)',
                  fontSize: '32px',
                  fontWeight: '700',
                },
              },
              small: {
                fontSize: '10px',
              },
            },
          },
          fontFaces: {
            raleway: {
              src: ['./font.woff'],
              fontWeight: '700',
            },
          },
        });
      });
    });
  });
});

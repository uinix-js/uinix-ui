import React from 'react';

import {useVariant} from '../../../index.js';
import {mount} from '../../utils/index.js';

const CustomElement = ({variant}) => {
  const variantStyle = useVariant(variant);
  cy.wrap(variantStyle).as('variantStyle');
  return <pre>{JSON.stringify(variantStyle, null, 2)}</pre>;
};

describe('useVariant', () => {
  it('should return undefined if variant style is not found in the system', () => {
    cy.fixture('system').then((system) => {
      mount(<CustomElement variant="invalid.variant" />, system);
      cy.get('@variantStyle').should('equal', undefined);
    });
  });

  it('should return the variant style from the system', () => {
    cy.fixture('system').then((system) => {
      mount(<CustomElement variant="Button.primary" />, system);
      cy.get('@variantStyle').should(
        'deep.equal',
        system.styles.variants.Button.primary,
      );
    });
  });
});

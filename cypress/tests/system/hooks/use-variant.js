import {mount} from '@cypress/react';
import React, {createElement as h} from 'react';

import {load, useVariant} from '../../../../index.js';
import system from '../../../fixtures/test-system.js';

const CustomElement = ({variant}) => {
  const variantStyle = useVariant(variant);
  cy.wrap(variantStyle).as('variantStyle');
  return <pre>{JSON.stringify(variantStyle, null, 2)}</pre>;
};

describe('useVariant', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useVariant('variant')).to.throw();
  });

  it('should return undefined if variant style is not found in the system', () => {
    load({h, system});
    mount(<CustomElement variant="invalid.variant" />);

    cy.get('@variantStyle').should('equal', undefined);
  });

  it('should return the variant style from the system', () => {
    load({h, system});
    mount(<CustomElement variant="Button.primary" />);

    cy.get('@variantStyle').should(
      'deep.equal',
      system.styles.variants.Button.primary,
    );
  });
});

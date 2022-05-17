import {mount} from '@cypress/react';
import React, {createElement as h} from 'react';

import {load} from '../../../../index.js';
import {useTypographyVariant} from '../../../../lib/system/hooks.js';
import system from '../../../fixtures/test-system.js';

function CustomElement({variant}) {
  const variantStyle = useTypographyVariant(variant);
  cy.wrap(variantStyle).as('variantStyle');
  return <pre>{JSON.stringify(variantStyle, null, 2)}</pre>;
}

describe('useTypographyVariant', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useTypographyVariant('variant')).to.throw();
  });

  it('should return undefined if variant style is not found in the system', () => {
    load({h, system});
    mount(<CustomElement variant="invalid.variant" />);

    cy.get('@variantStyle').should('equal', undefined);
  });

  it('should return the variant style from the system', () => {
    load({h, system});
    mount(<CustomElement variant="heading.1" />);

    cy.get('@variantStyle').should(
      'deep.equal',
      system.styles.typography.variants.heading[1],
    );
  });
});

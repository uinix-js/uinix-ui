import {mount} from '@cypress/react';
import React, {createElement as h} from 'react';

import {createSystem} from '../../../../index.js';
import {useStyleVariant} from '../../../../lib/system/hooks.js';
import system from '../../../fixtures/test-system.js';

function CustomElement({styleVariant}) {
  const variantStyle = useStyleVariant(styleVariant);
  cy.wrap(variantStyle).as('variantStyle');
  return <pre>{JSON.stringify(variantStyle, null, 2)}</pre>;
}

describe('useStyleVariant', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useStyleVariant('variant')).to.throw();
  });

  it('should return undefined if variant style is not found in the system', () => {
    createSystem({h, system});
    mount(<CustomElement styleVariant="invalid.variant" />);

    cy.get('@variantStyle').should('equal', undefined);
  });

  it('should return the variant style from the system', () => {
    createSystem({h, system});
    mount(<CustomElement styleVariant="Button.primary" />);

    cy.get('@variantStyle').should('deep.equal', system.styles.Button.primary);
  });
});

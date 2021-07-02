import {mount} from '@cypress/react';
import React, {createElement as h} from 'react';

import {load, useStyles} from '../../../../index.js';
import system from '../../../fixtures/test-system.js';

const CustomElement = () => {
  const styles = useStyles();
  cy.wrap(styles).as('styles');
  return <pre>{JSON.stringify(styles, null, 2)}</pre>;
};

describe('useStyles', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useStyles()).to.throw();
  });

  it('should return styles from the system', () => {
    load({h, system});
    mount(<CustomElement />);

    cy.get('@styles').should('deep.equal', system.styles);
  });
});

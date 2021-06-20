import React from 'react';

import {useStyles} from '../../../../index.js';
import testSystem from '../../../fixtures/test-system.js';
import {mount} from '../../../utils/index.js';

const CustomElement = () => {
  const styles = useStyles();
  cy.wrap(styles).as('styles');
  return <pre>{JSON.stringify(styles, null, 2)}</pre>;
};

describe('useStyles', () => {
  it('should return styles from the system', () => {
    mount(<CustomElement />, testSystem);
    cy.get('@styles').should('deep.equal', testSystem.styles);
  });
});

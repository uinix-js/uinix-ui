import React from 'react';

import {createSystem, useStyles} from '../../../index.js';
import {mount} from '../../utils/index.js';

const CustomElement = () => {
  const styles = useStyles();
  cy.wrap(styles).as('styles');
  return <pre>{JSON.stringify(styles, null, 2)}</pre>;
};

describe('useStyles', () => {
  it('should retrieve styles from the system', () => {
    cy.fixture('system').then((system) => {
      mount(<CustomElement />, system);
      cy.get('@styles').should('deep.equal', createSystem(system).styles);
    });
  });
});
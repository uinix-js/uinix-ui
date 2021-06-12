import React from 'react';

import {createTheme, useTheme} from '../../../../index.js';
import testSystem from '../../../fixtures/test-system.js';
import {mount} from '../../../utils/index.js';

const CustomElement = () => {
  const theme = useTheme();
  cy.wrap(theme).as('theme');
  return <pre>{JSON.stringify(theme, null, 2)}</pre>;
};

describe('useTheme', () => {
  it('should retrieve the theme from the system', () => {
    mount(<CustomElement />, testSystem);
    cy.get('@theme').should('deep.equal', createTheme(testSystem.theme));
  });
});

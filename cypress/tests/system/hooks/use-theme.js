import {mount} from '@cypress/react';
import React from 'react';

import {createTheme, load, useTheme} from '../../../../index.js';
import system from '../../../fixtures/test-system.js';

const CustomElement = () => {
  const theme = useTheme();
  cy.wrap(theme).as('theme');
  return <pre>{JSON.stringify(theme, null, 2)}</pre>;
};

describe('useTheme', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useTheme()).to.throw();
  });

  it('should retrieve the theme from the system', () => {
    load(React.createElement, system);
    mount(<CustomElement />);

    cy.get('@theme').should('deep.equal', createTheme(system.theme));
  });
});

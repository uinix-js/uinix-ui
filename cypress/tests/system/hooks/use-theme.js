import {mount} from '@cypress/react';
import React, {createElement as h} from 'react';

import {createTheme, load, useTheme} from '../../../../index.js';
import system from '../../../fixtures/test-system.js';

const CustomElement = ({path = ''}) => {
  const theme = useTheme(path);
  cy.wrap(theme).as('theme');
  return <pre>{JSON.stringify(theme, null, 2)}</pre>;
};

describe('useTheme', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useTheme()).to.throw();
  });

  it('should retrieve the theme from the system', () => {
    load({h, system});
    mount(<CustomElement />);
    cy.get('@theme').should('deep.equal', createTheme(system.theme));
  });

  it('should retrieve the theme values given a property path', () => {
    load({h, system});
    mount(<CustomElement path="keyframes.flicker" />);
    cy.get('@theme').should(
      'deep.equal',
      createTheme(system.theme).keyframes.flicker,
    );

    mount(<CustomElement path="colors.palette" />);
    cy.get('@theme').should(
      'deep.equal',
      createTheme(system.theme).colors.palette,
    );

    mount(<CustomElement path="colors.palette.red1" />);
    cy.get('@theme').should(
      'deep.equal',
      createTheme(system.theme).colors.palette.red1,
    );

    mount(<CustomElement path="spacings.4" />);
    cy.get('@theme').should(
      'deep.equal',
      createTheme(system.theme).spacings[4],
    );
  });
});

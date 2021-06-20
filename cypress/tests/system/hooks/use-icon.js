import {mount} from '@cypress/react';
import React from 'react';

import {load, useIcon} from '../../../../index.js';
import system from '../../../fixtures/test-system.js';

const CustomElement = ({icon}) => {
  const iconSvg = useIcon(icon);
  cy.wrap(iconSvg).as('iconSvg');
  return <pre>{iconSvg}</pre>;
};

describe('useIcon', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useIcon('x')).to.throw();
  });

  it('should return undefined if icon is not found in the system', () => {
    load(React.createElement, system);
    mount(<CustomElement icon="invalid icon" />);

    cy.get('@iconSvg').should('equal', undefined);
  });

  it('should return the SVG content for the specified icon from the system', () => {
    const icon = 'x';
    load(React.createElement, system);
    mount(<CustomElement icon={icon} />);

    cy.get('@iconSvg').should('equal', system.icons[icon]);
  });
});

import React from 'react';

import {useIcon} from '../../../../index.js';
import testSystem from '../../../fixtures/test-system.js';
import {mount} from '../../../utils/index.js';

const CustomElement = ({icon}) => {
  const iconSvg = useIcon(icon);
  cy.wrap(iconSvg).as('iconSvg');
  return <pre>{iconSvg}</pre>;
};

describe('useIcon', () => {
  it('should return undefined if icon is not found in the system', () => {
    mount(<CustomElement icon="invalid icon" />, testSystem);
    cy.get('@iconSvg').should('equal', undefined);
  });

  it('should return the SVG content for the specified icon from the system', () => {
    const icon = 'x';

    mount(<CustomElement icon={icon} />, testSystem);
    cy.get('@iconSvg').should('equal', testSystem.icons[icon]);
  });
});

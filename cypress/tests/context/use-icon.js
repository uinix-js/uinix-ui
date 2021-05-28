import React from 'react';

import {useIcon} from '../../../index.js';
import {mount} from '../../utils/index.js';

const CustomElement = ({icon}) => {
  const iconSvg = useIcon(icon);
  cy.wrap(iconSvg).as('iconSvg');
  return <pre>{iconSvg}</pre>;
};

const icon = 'x';

describe('useIcon', () => {
  it('should return undefined if icon is not found in the system', () => {
    cy.fixture('system').then((system) => {
      mount(<CustomElement icon="invalid icon" />, system);
      cy.get('@iconSvg').should('equal', undefined);
    });
  });

  it('should return the SVG content for the specified icon from the system', () => {
    cy.fixture('system').then((system) => {
      mount(<CustomElement icon={icon} />, system);
      cy.get('@iconSvg').should('equal', system.icons[icon]);
    });
  });
});

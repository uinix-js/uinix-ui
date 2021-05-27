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
  it('should retrieve an icon SVG content from the system', () => {
    cy.fixture('system').then((system) => {
      mount(<CustomElement icon="invalid icon" />, system);
      cy.get('@iconSvg').should('equal', undefined);

      mount(<CustomElement icon={icon} />, system);
      cy.get('@iconSvg').should('equal', system.icons[icon]);
    });
  });
});

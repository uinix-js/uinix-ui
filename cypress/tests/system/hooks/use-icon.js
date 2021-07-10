import {mount} from '@cypress/react';
import React, {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server.js';

import {load, useIcon} from '../../../../index.js';
import {parseSvgElement} from '../../../../lib/util/parse-svg-element.js';
import system from '../../../fixtures/test-system.js';

const CustomElement = ({icon}) => {
  const iconSvg = useIcon(icon);
  cy.wrap(iconSvg).as('iconSvg');
  return iconSvg;
};

describe('useIcon', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useIcon('x')).to.throw();
  });

  it('should return null if icon is not found in the system', () => {
    load({h, system});
    mount(<CustomElement icon="invalid icon" />);

    cy.get('@iconSvg').should('equal', null);
  });

  it('should return an SVG element for the specified icon from the system', () => {
    const icon = 'x';
    load({h, system});
    mount(<CustomElement icon={icon} />);

    const svg = system.icons[icon];
    const svgElement = parseSvgElement({h, svg});
    cy.get('@iconSvg').should((iconSvg) => {
      expect(renderToStaticMarkup(iconSvg)).to.equal(
        renderToStaticMarkup(svgElement),
      );
    });
  });
});

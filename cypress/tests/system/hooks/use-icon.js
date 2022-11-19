import {mount} from '@cypress/react';
import React, {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server.js';

import {createSystem} from '../../../../index.js';
import {useIcon} from '../../../../lib/system/hooks.js';
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
    createSystem(system);
    mount(<CustomElement icon="invalid icon" />);

    cy.get('@iconSvg').should('equal', null);
  });

  it('should return an SVG element for the specified icon from the system', () => {
    const icon = 'x';
    createSystem(system);
    mount(<CustomElement icon={icon} />);

    const svg = system.icons[icon];
    const svgElement = parseSvgElement(svg, {h});
    cy.get('@iconSvg').should((iconSvg) => {
      expect(renderToStaticMarkup(iconSvg)).to.equal(
        renderToStaticMarkup(svgElement),
      );
    });
  });

  it('should return an SVG element for the specified nested icon from the system', () => {
    createSystem(system);
    mount(<CustomElement icon="nested.x" />);
    const svg = system.icons.nested.x;
    const svgElement = parseSvgElement(svg, {h});
    cy.get('@iconSvg').should((iconSvg) => {
      expect(renderToStaticMarkup(iconSvg)).to.equal(
        renderToStaticMarkup(svgElement),
      );
    });
  });

  it('should return an SVG element for the specified direct icon from the system', () => {
    createSystem(system);
    mount(<CustomElement icon="a.b.c" />);
    const svg = system.icons['a.b.c'];
    const svgElement = parseSvgElement(svg, {h});
    cy.get('@iconSvg').should((iconSvg) => {
      expect(renderToStaticMarkup(iconSvg)).to.equal(
        renderToStaticMarkup(svgElement),
      );
    });
  });
});

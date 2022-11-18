import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server.js';

import {parseSvgElement} from '../../../lib/util/parse-svg-element.js';

describe('parseSvgElement', () => {
  const h = () => '<svg>parsed</svg>';

  it('should return null if svg is empty', () => {
    expect(parseSvgElement('', {h})).to.equal(null);
    expect(parseSvgElement(null, {h})).to.equal(null);
    expect(parseSvgElement(undefined, {h})).to.equal(null);
  });

  it('should return null if svg fails to parse', () => {
    expect(parseSvgElement('bad svg', {h})).to.equal(null);
  });

  it('should return svg element (react.createElement)', () => {
    const svg = '<svg><g><path></path></g></svg>';
    expect(
      renderToStaticMarkup(parseSvgElement(svg, {h: React.createElement})),
    ).to.equal(svg);
  });
});

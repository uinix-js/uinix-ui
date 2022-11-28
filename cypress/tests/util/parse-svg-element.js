import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server.js';

import {parseSvgElement} from '../../../lib/util/parse-svg-element.js';

describe('parseSvgElement', () => {
  const createElement = () => '<svg>parsed</svg>';

  it('should return null if svg is empty', () => {
    expect(parseSvgElement('', {createElement})).to.equal(null);
    expect(parseSvgElement(null, {createElement})).to.equal(null);
    expect(parseSvgElement(undefined, {createElement})).to.equal(null);
  });

  it('should return null if svg fails to parse', () => {
    expect(parseSvgElement('bad svg', {createElement})).to.equal(null);
  });

  it('should return svg element (react.createElement)', () => {
    const svg = '<svg><g><path></path></g></svg>';
    expect(
      renderToStaticMarkup(
        parseSvgElement(svg, {createElement: React.createElement}),
      ),
    ).to.equal(svg);
  });
});

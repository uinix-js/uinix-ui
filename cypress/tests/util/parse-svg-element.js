import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server.js';

import {parseSvgElement} from '../../../lib/util/parse-svg-element.js';

describe('parseSvgElement', () => {
  const h = () => '<svg>parsed</svg>';

  it('should return null if svg is empty', () => {
    expect(parseSvgElement({h, svg: ''})).to.equal(null);
  });

  it('should return null if parsing fails', () => {
    expect(parseSvgElement({h, svg: 'bad svg'})).to.equal(null);
  });

  it('should return svg element (react.createElement)', () => {
    const svg = '<svg><g><path></path></g></svg>';
    expect(
      renderToStaticMarkup(parseSvgElement({h: React.createElement, svg})),
    ).to.equal(svg);
  });
});

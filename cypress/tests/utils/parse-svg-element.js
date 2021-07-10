import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server.js';

import {parseSvgElement} from '../../../lib/util/parse-svg-element.js';

describe('parseSvgElement', () => {
  it('should return null if parsing fails', () => {
    expect(parseSvgElement({h, svg: 'bad svg'})).to.equal(null);
  });

  it('should return svg element from a valid svg string', () => {
    const svg = '<svg><g><path></path></g></svg>';
    expect(renderToStaticMarkup(parseSvgElement({h, svg}))).to.equal(svg);
  });
});

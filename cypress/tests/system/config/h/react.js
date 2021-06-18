import {createElement as h} from 'react';
import {render} from 'react-dom';

import {assert, createCustomElement} from './utils.js';

describe('React.createElement', () => {
  it('should render components as intended', () => {
    render(createCustomElement(h)(), document.body);

    assert();
  });
});

import {h, render} from 'preact';

import {assert, createCustomElement} from './utils.js';

describe('Preact.h', () => {
  it('should render components as intended', () => {
    render(createCustomElement(h)(), document.body);

    assert();
  });
});

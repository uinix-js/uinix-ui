import {m, render} from 'mithril';

import {assert, createCustomElement} from './utils.js';

describe('m', () => {
  it('should render components as intended', () => {
    render(document.body, createCustomElement(m)());

    assert();
  });
});

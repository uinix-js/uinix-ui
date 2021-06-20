import {render} from 'solid-js/web/dist/server.js';
import h from 'solid-js/h/dist/h.js';

import {assert, createCustomElement} from './utils.js';

describe('solid/h', () => {
  it('should render components as intended', () => {
    render(createCustomElement(h), document.body);

    assert();
  });
});

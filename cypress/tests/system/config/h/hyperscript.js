import h from 'hyperscript';

import {assert, createCustomElement} from './utils.js';

describe('h', () => {
  it('should render components as intended', () => {
    document.body.append(createCustomElement(h)());

    assert({excludeIconAssertion: true});
  });
});

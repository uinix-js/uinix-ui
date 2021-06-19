import htm from 'htm';
import * as Preact from 'preact';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import {assert, createCustomElement} from './utils.js';

describe('htm', () => {
  describe('/preact', () => {
    it('should render components as intended', () => {
      const {h} = Preact;
      const html = htm.bind(h);
      Preact.render(html`${createCustomElement(h)()}`, document.body);

      assert();
    });
  });

  describe('/react', () => {
    it('should render components as intended', () => {
      const h = React.createElement;
      const html = htm.bind(h);
      ReactDom.render(html`${createCustomElement(h)()}`, document.body);

      assert();
    });
  });
});

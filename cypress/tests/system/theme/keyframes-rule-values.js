import React from 'react';

import {Element} from '../../../../index.js';
import {hasKeyframesChainer} from '../../../utils/has-keyframes-chainer.js';
import {mountWithSystem} from '../../../utils/mount-with-system.js';

const system = {
  theme: {
    keyframes: {
      appear: {
        '0%': {opacity: 'invisible'},
        '100%': {opacity: 'visible'},
      },
    },
  },
};

const styles = {
  animationName: 'appear',
};

describe('Keyframes rule values', () => {
  it('should resolve keyframes rule values into valid CSS keyframes', () => {
    mountWithSystem(
      <Element id="test" styles={styles}>
        Element
      </Element>,
      system,
    );
    cy.get('#test').should(hasKeyframesChainer);
  });
});

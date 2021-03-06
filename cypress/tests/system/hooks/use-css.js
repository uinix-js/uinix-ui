import {mount} from '@cypress/react';
import React, {createElement as h} from 'react';

import {load} from '../../../../index.js';
import {useCss} from '../../../../lib/system/hooks.js';
import system from '../../../fixtures/test-system.js';

const style1 = {
  backgroundColor: 'rgb(225, 225, 225)',
  color: 'rgb(255, 0, 0)',
};
const style2 = ({isActive}) => ({
  color: isActive ? 'rgb(0, 0, 255)' : undefined,
  cursor: isActive ? 'pointer' : undefined,
});

const CustomElement = ({id, styleProps, styles}) => {
  const css = useCss(styleProps);
  const className = css(styles);
  return (
    <div id={id} className={className}>
      Custom Element
    </div>
  );
};

describe('useCss', () => {
  it('should throw if system is not loaded', () => {
    expect(() => useCss()).to.throw();
  });

  it('should retrieve a css function that can be used to apply and compose styles', () => {
    load({h, system});
    mount(
      <CustomElement
        id="test"
        styleProps={{
          isActive: true,
        }}
        styles={[style1, style2]}
      />,
    );

    cy.get('#test')
      .should('have.css', 'background-color', 'rgb(225, 225, 225)') // Via style1
      .should('have.css', 'color', 'rgb(0, 0, 255)') // Via style2
      .should('have.css', 'cursor', 'pointer'); // Via style2
  });
});

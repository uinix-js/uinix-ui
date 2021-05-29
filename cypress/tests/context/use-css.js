import React from 'react';

import {useCss} from '../../../index.js';
import {mount} from '../../utils/index.js';

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
  it('should retrieve a css function that can be used to apply and compose styles', () => {
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

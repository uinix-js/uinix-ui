export {createStyles};

import {merge} from 'uinix-fp';

import {createTypography} from './create-typography.js';

const createStyles = (overrideStyles = {}, typography = createTypography()) => {
  const defaultStyles = {
    global: typography.global,
    rules: {},
    variants: {
      Text: typography.variants,
    },
  };

  return merge(defaultStyles)(overrideStyles);
};

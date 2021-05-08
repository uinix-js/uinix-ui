export {createStyles};

import {merge} from 'uinix-fp';

import {createTypography} from './create-typography.js';

const createStyles = (overrideStyles = {}, typography = createTypography()) => {
  const defaultStyles = {
    components: {
      Element: [],
      Icon: [],
      Layout: [],
      Text: [],
    },
    global: typography.global,
    rules: {},
    variants: {
      Text: typography.variants,
    },
  };

  return merge(defaultStyles)(overrideStyles);
};

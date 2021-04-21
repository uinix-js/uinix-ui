export { createStyles };

import { merge } from 'uinix-fp';

const createStyles = (overrideStyles = {}, typography = {}) => {
  const defaultStyles = {
    components: {
      Element: [],
      Icon: [],
      Layout: [],
      Text: [],
    },
    global: {},
    rules: {},
    variants: {
      Text: typography,
    },
  };

  return merge(defaultStyles)(overrideStyles);
};

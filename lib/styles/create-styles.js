export { createStyles };

import { merge } from 'uinix-fp';

const createStyles = (overrideStyles = {}) => {
  const defaultStyles = {
    components: {
      Element: [],
      Icon: [],
      Layout: [],
    },
    global: {},
    rules: {},
  };

  return merge(defaultStyles)(overrideStyles);
};

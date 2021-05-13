import {merge} from 'uinix-fp';

export {createStyles};

const createStyles = (styles = {}, typography = {}) =>
  merge({
    global: typography.global,
    rules: {},
    variants: {
      Text: typography.variants,
    },
  })(styles);

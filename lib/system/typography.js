import {merge} from 'uinix-fp';

export {createTypography};

const createTypography = (typography) =>
  merge({
    fontFaces: {},
    global: {},
    variants: {},
  })(typography);

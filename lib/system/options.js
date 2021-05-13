import {merge} from 'uinix-fp';

export {createOptions};

const createOptions = (options = {}) =>
  merge({
    isAtomicCss: false,
    responsiveAttributes: [],
    responsiveBreakpoints: [],
    shorthandPropsMapping: {},
  })(options);

import {merge} from 'uinix-fp';

export {createTypography};

const createTypography = (overrideTypography = {}) => {
  const defaultTypography = {
    fontFaces: {},
    global: {},
    variants: {},
  };

  return merge(defaultTypography)(overrideTypography);
};

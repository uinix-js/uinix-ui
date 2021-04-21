export { createTypography };

import { merge } from 'uinix-fp';

const createTypography = (overrideTypography = {}) => {
  const defaultTypography = {
    fontFaces: [],
    global: {},
    variants: {},
  };

  return merge(defaultTypography)(overrideTypography);
};

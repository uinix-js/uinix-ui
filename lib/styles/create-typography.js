export { createTypography };

import { merge } from 'uinix-fp';

const createTypography = (overrideTypography = {}) => {
  const defaultTypography = {
    fonts: [],
    global: {},
    variants: {},
  };

  return merge(defaultTypography)(overrideTypography);
};

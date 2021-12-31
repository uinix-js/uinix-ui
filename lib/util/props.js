import {props as fpProps, isPlainObject} from 'uinix-fp';

/**
 * TODO: decide if fpProps should support this behavior
 * @template V
 * @param {string} path object property path
 * @returns {<X extends Record<string, any>>(x: X) => V}
 */
export const props = (path) => (x) => {
  if (!path || !isPlainObject(x)) {
    return x;
  }

  return fpProps(path)(x);
};

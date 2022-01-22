import {filter, isTruthy} from 'uinix-fp';

export {mergeClassNames};

const mergeClassNames = (classNames) =>
  filter(isTruthy)(classNames).join(' ') || undefined;

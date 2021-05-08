export {coerceStyles};

const coerceStyles = (styles) => {
  return Array.isArray(styles) ? styles : [styles];
};

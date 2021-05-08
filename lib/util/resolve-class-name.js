export {resolveClassName};

const resolveClassName = (resolvedStyles, className) => {
  let resolvedClassName = resolvedStyles;
  if (className) {
    resolvedClassName += ` ${className}`;
  }

  return resolvedClassName || undefined;
};

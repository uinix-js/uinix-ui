export const decamelizeCssProperty = (x) =>
  x.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

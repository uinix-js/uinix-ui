import felaResponsiveValue from 'fela-plugin-responsive-value';

export {responsiveValue};

/**
 * Fela plugin to handle responsive values.
 *
 * @param {object} props
 * @param {string[]} props.breakpoints
 * @param {string[]} props.responsiveCssProperties
 * @returns {import('./plugin-theme-value.js').Plugin}
 */
const responsiveValue = ({breakpoints, responsiveCssProperties}) =>
  felaResponsiveValue(
    getMediaQueries(breakpoints),
    getResponsiveProperties(responsiveCssProperties),
  );

/**
 * Returns an array of media query breakpoints (`min-width`-based) given an array of responsive breakpoints (`min-width`).
 *
 * @param {string[]} breakpoints
 * @returns {() => string[]}
 */
const getMediaQueries = (breakpoints) => () =>
  breakpoints.map(
    (breakpoint) => `@media screen and (min-width: ${breakpoint})`,
  );

/**
 * Returns a reshaped mapping of the provided `responsiveCssProperties`.
 *
 * @param {string[]} responsiveCssProperties
 * @returns {Object.<string, boolean>} mapping of CSS properties that should be responsive
 */
const getResponsiveProperties = (responsiveCssProperties) =>
  responsiveCssProperties.reduce((acc, attribute) => {
    acc[attribute] = true;
    return acc;
  }, {});

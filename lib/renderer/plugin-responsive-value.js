// @ts-ignore: formal types unavailable
import felaResponsiveValue from 'fela-plugin-responsive-value';

export {responsiveValue};

/**
 * @typedef {import('fela').TPlugin} Plugin
 */

/**
 * Fela plugin to handle responsive values.
 *
 * @param {object} props
 * @param {string[]} props.breakpoints
 * @param {string[]} props.responsiveCssProperties
 * @returns {Plugin}
 */
const responsiveValue = ({breakpoints, responsiveCssProperties}) =>
  felaResponsiveValue(
    getMediaQueries(breakpoints),
    getResponsiveProperties(responsiveCssProperties),
  );

/**
 * Returns a callback that returns min-width-based media query breakpoints.
 *
 * @param {string[]} breakpoints
 * @returns {() => string[]}
 */
const getMediaQueries = (breakpoints) => () =>
  breakpoints.map(
    (breakpoint) => `@media screen and (min-width: ${breakpoint})`,
  );

/**
 * Reduces an array of responsive CSS properties into object notation.
 *
 * @param {string[]} responsiveCssProperties
 * @returns {Object<string, boolean>}
 */
const getResponsiveProperties = (responsiveCssProperties) => {
  /** @type {Object<string, boolean>} */
  const initialAcc = {};
  return responsiveCssProperties.reduce((acc, attribute) => {
    acc[attribute] = true;
    return acc;
  }, initialAcc);
};

import felaResponsiveValue from 'fela-plugin-responsive-value';

export {responsiveValue};

const responsiveValue = ({breakpoints, responsiveCssProperties}) =>
  felaResponsiveValue(
    getMediaQueries(breakpoints),
    getResponsiveProperties(responsiveCssProperties),
  );

const getMediaQueries = (breakpoints) => () =>
  breakpoints.map(
    (breakpoint) => `@media screen and (min-width: ${breakpoint})`,
  );

const getResponsiveProperties = (responsiveCssProperties) => {
  const initialAcc = {};
  return responsiveCssProperties.reduce((acc, attribute) => {
    acc[attribute] = true;
    return acc;
  }, initialAcc);
};

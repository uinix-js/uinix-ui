import felaResponsiveValue from 'fela-plugin-responsive-value';

export {responsiveValue};

const responsiveValue = ({responsiveAttributes, responsiveBreakpoints}) =>
  felaResponsiveValue(
    getMediaQueries(responsiveBreakpoints),
    getResponsiveProperties(responsiveAttributes),
  );

const getMediaQueries = (responsiveBreakpoints) =>
  responsiveBreakpoints.map(
    (breakpoint) => `@media screen and (min-width: ${breakpoint})`,
  );

const getResponsiveProperties = (responsiveAttributes) =>
  responsiveAttributes.reduce((acc, attribute) => {
    acc[attribute] = true;
    return acc;
  }, {});

import {createTypography} from 'uinix-ui';

const typography = createTypography({
  global: {
    a: {
      color: 'brand.primary',
      textDecoration: 'none',
    },
    body: {
      color: 'text.primary',
      fontFamily: 'body',
      fontSize: 'm',
      letterSpacing: 'body',
      lineHeight: 'body',
    },
    code: {
      backgroundColor: 'brand.lighter',
      borderRadius: 'm',
      fontFamily: 'monospace',
      paddingLeft: 'xs',
      paddingRight: 'xs',
    },
    h1: {
      borderBottom: 'bordered',
      fontSize: 'xxl',
      marginBottom: 'm',
      marginTop: 'm',
      paddingBottom: 'xxs',
    },
    h2: {
      borderBottom: 'bordered',
      fontSize: 'xl',
      marginBottom: 's',
      marginTop: 's',
      paddingBottom: 'xxs',
    },
    h3: {
      fontSize: 'l',
      marginBottom: 'xs',
      marginTop: 'xs',
    },
    h4: {
      fontSize: 'm',
      marginBottom: 'xs',
      marginTop: 'xs',
    },
    h5: {
      color: 'text.secondary',
      fontSize: 'm',
      marginBottom: 'xxs',
      marginTop: 'xxs',
    },
    h6: {
      color: 'text.secondary',
      fontSize: 's',
      marginBottom: 'xxs',
      marginTop: 'xxs',
    },
    small: {
      color: 'text.secondary',
      fontSize: 's',
    },
    ul: {
      marginTop: 0,
    },

    // Anchors
    '.anchor.before': {
      left: '-l',
      position: 'absolute',
    },
  },
});

export default typography;

import { createStyles } from 'uinix-ui';

import typography from './typography.js';

const rules = {
  active: {
    backgroundColor: 'brand.active',
    color: 'brand.primaryInverse',
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 'disabled',
  },
  interactive: ({ theme, onClick }) => ({
    cursor: onClick ? 'pointer' : undefined,
    ':active': {
      filter: onClick
        ? `drop-shadow(0 0 0.2rem ${theme.colors.brand.light})`
        : undefined,
    },
    ':hover': {
      opacity: onClick ? 'interactive' : undefined,
    },
  }),
};

const components = {
  Element: [
    ({ disabled }) => (disabled ? rules.disabled : null),
    rules.interactive,
  ],
};

const global = {
  '*': {
    boxSizing: 'border-box',
  },
  html: {
    scrollBehavior: 'smooth',
  },
  body: {
    margin: 0,
    padding: 0,
  },
  'a:hover': {
    // TODO: https://github.com/robinweser/fela/issues/876
    opacity: 'interactive',
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 'm',
    fontSize: 'm',
    paddingBottom: 's',
    paddingLeft: 'm',
    paddingRight: 'm',
    paddingTop: 's',
  },
  hr: {
    borderBottom: 'bordered',
    borderTop: 'none',
    margin: 0,
    width: '100%',
  },
};

const variants = {};

const styles = createStyles(
  {
    components,
    global,
    rules,
    variants,
  },
  typography,
);

export default styles;

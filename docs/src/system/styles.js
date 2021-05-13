const styles = {
  active: {
    backgroundColor: 'brand.active',
    color: 'brand.primaryInverse',
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 'disabled',
  },
  interactive: ({theme, onClick}) => ({
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

export default styles;

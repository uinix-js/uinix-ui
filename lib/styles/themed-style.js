export { themedStyle };

const themedStyle = (props) => {
  const { as, theme } = props;
  return theme.styles[as];
};

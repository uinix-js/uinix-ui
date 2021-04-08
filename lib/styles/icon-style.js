export { iconStyle };

const iconStyle = (props) => {
  const { size } = props;
  return {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    display: 'inline-flex',
    flex: 'none',
    height: size,
    margin: 0,
    padding: 0,
    width: size,
  };
};

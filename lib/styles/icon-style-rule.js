export { iconStyleRule };

const iconStyleRule = ({ size }) => {
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

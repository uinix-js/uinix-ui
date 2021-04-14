export { iconStyleRule };

const iconStyleRule = ({ height, size, width }) => {
  return {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    display: 'flex',
    flex: 'none',
    height: height || size,
    margin: 0,
    padding: 0,
    width: width || size,
  };
};

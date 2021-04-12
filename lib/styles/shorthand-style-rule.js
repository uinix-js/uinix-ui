export { shorthandStyleRule };

const shorthandStyleRule = ({
  backgroundColor,
  color,
  m,
  mb,
  ml,
  mr,
  mt,
  mx,
  my,
  p,
  pb,
  pl,
  pr,
  pt,
  px,
  py,
}) => {
  const marginBottom = mb || my || m;
  const marginLeft = ml || mx || m;
  const marginRight = mr || mx || m;
  const marginTop = mt || my || m;
  const paddingBottom = pb || py || p;
  const paddingLeft = pl || px || p;
  const paddingRight = pr || px || p;
  const paddingTop = pt || py || p;

  return {
    backgroundColor,
    color,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
  };
};

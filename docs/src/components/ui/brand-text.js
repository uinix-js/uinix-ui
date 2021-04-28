import React from 'react';
import { Text } from 'uinix-ui';

const BrandText = ({ text }) => {
  const ui = text.slice(0, 2);
  const nix = text.slice(2, 5);
  const rest = text.slice(5);

  return (
    <>
      <Text color="brand.primary">{ui}</Text>
      <Text color="brand.secondary">{nix}</Text>
      <Text color="brand.light">{rest}</Text>
    </>
  );
};

export default BrandText;

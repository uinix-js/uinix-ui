import { Link } from 'gatsby';
import React from 'react';
import { i } from 'uinix-fp';
import { Text } from 'uinix-ui';

const NavCrumbs = ({ uri }) => {
  let path = '';
  const crumbs = uri
    .split('/')
    .filter(i)
    .map((part, i, array) => {
      const subpath = `/${part}`;
      path += subpath;
      return {
        label: subpath,
        to: i < array.length - 1 ? `${path}/` : null,
      };
    });

  return crumbs.map(({ label, to }) => {
    if (to) {
      return (
        <Link key={to} to={to}>
          <Text color="brand.light" fontWeight="light">
            {label}
          </Text>
        </Link>
      );
    }

    return (
      <Text key={to} color="brand.lighter" fontWeight="light">
        {label}
      </Text>
    );
  });
};

export default NavCrumbs;

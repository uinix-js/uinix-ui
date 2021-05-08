import {Link} from 'gatsby';
import React from 'react';
import {Layout, Text} from 'uinix-ui';

import {GITHUB_REPO, GITHUB_USER} from '../../urls.js';
import {useIsReady} from '../../hooks/use-is-ready.js';
import BrandText from '../ui/brand-text.js';
import NavCrumbs from '../ui/nav-crumbs.js';
import ScrollToTopIcon from '../ui/scroll-to-top-icon.js';

const BasePageLayout = ({children, uri}) => {
  const isReady = useIsReady();

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Layout direction="column" h="100vh" px="xl" pt="m" spacing="l">
        <Layout as="header" align="center" justify="space-between">
          <Text as="h1" b="none" m={0}>
            <Link to="/">
              <BrandText text="uinix-ui" />
            </Link>
            <NavCrumbs uri={uri} />
          </Text>
          <a href={GITHUB_REPO}>Github</a>
        </Layout>
        <Layout
          as="main"
          flex="auto"
          direction="column"
          mx="auto"
          styles={styles.container}
        >
          {children}
        </Layout>
        <Layout
          as="footer"
          align="center"
          py="m"
          mx="auto"
          justify="center"
          w="width.container"
          spacing="m"
        >
          <a href={GITHUB_USER}>
            <BrandText text="uinix-js" />
          </a>
          <small>© {new Date().getFullYear()}</small>
        </Layout>
      </Layout>
      <ScrollToTopIcon />
    </>
  );
};

const styles = {
  container: {
    maxWidth: 'width.container',
    width: '100%',
  },
};

export default BasePageLayout;

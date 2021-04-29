import { Link } from 'gatsby';
import React from 'react';
import { Layout, Text } from 'uinix-ui';

import { GITHUB_REPO, GITHUB_USER } from '../../urls.js';
import { useIsReady } from '../../hooks/use-is-ready.js';
import BrandText from '../ui/brand-text.js';
import ScrollToTopIcon from '../ui/scroll-to-top-icon.js';

const BasePageLayout = ({ children }) => {
  const isReady = useIsReady();

  if (!isReady) {
    return null;
  }

  return (
    <>
      <Layout direction="column" h="100vh" px="xl" pt="m" spacing="l">
        <Layout as="header" align="center" justify="space-between">
          <Link to="/">
            <Text as="h1" b="none" m={0}>
              <BrandText text="uinix-ui" />
            </Text>
          </Link>
          <a href={GITHUB_REPO}>Github</a>
        </Layout>
        <Layout
          as="main"
          flex="auto"
          direction="column"
          mx="auto"
          styles={styles.container}>
          {children}
        </Layout>
        <Layout
          as="footer"
          align="center"
          py="m"
          mx="auto"
          justify="center"
          w="width.container">
          <small>
            <a href={GITHUB_USER}>
              <code>uinix-js</code>
            </a>{' '}
            © {new Date().getFullYear()}
          </small>
        </Layout>
      </Layout>
      <ScrollToTopIcon />
    </>
  );
};

const styles = {
  container: {
    maxWidth: 'width.container',
  },
};

export default BasePageLayout;

import React from 'react';
import {Icon} from 'uinix-ui';

import {useScrollTop} from '../../hooks/use-scroll-top.js';

const ScrollToTopIcon = () => {
  const [canScrollTop, scrollTop] = useScrollTop();

  if (!canScrollTop) {
    return null;
  }

  return (
    <Icon
      color="icon.default"
      icon="arrowUpCircle"
      size="icon.xl"
      position="fixed"
      right="s"
      top="m"
      title="Back to top"
      onClick={scrollTop}
    />
  );
};

export default ScrollToTopIcon;

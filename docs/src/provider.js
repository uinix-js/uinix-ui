import {MDXProvider} from '@mdx-js/react';
import React from 'react';
import {Provider as SystemProvider} from 'uinix-ui';

import LiveCode from './components/ui/live-code.js';
import system from './system/index.js';

const Provider = ({children}) => {
  return (
    <SystemProvider system={system}>
      <MDXProvider components={components}>{children}</MDXProvider>
    </SystemProvider>
  );
};

const components = {
  pre: (props) => {
    const {children: code, className, live, ...rest} = props.children.props;
    return (
      <LiveCode
        code={code}
        language={className.replace('language-', '')}
        live={live}
        {...rest}
      />
    );
  },
};

export default Provider;

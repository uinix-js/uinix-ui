import {MDXProvider} from '@mdx-js/react';
import React from 'react';
import {Provider as SystemProvider} from 'uinix-ui';

import LiveCode from './components/ui/live-code.js';
import system from './system/index.js';

const Provider = ({children}) => {
  return (
    <SystemProvider options={options} system={system}>
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

const options = {
  responsiveAttributes: ['color'],
  responsiveBreakpoints: ['480px', '768px'],
  shorthandStyleMapping: {
    backgroundColor: ['bg'],
    borderRadius: ['borderRadius'],
    border: ['b'],
    borderBottom: ['bb', 'by', 'b'],
    borderLeft: ['bl', 'bx', 'b'],
    borderRight: ['br', 'bx', 'b'],
    borderTop: ['bt', 'by', 'b'],
    boxShadow: ['boxShadow'],
    color: ['color'],
    flex: ['flex'],
    height: ['h'],
    width: ['w'],
    margin: ['m'],
    marginBottom: ['mb', 'my', 'm'],
    marginLeft: ['ml', 'mx', 'm'],
    marginRight: ['mr', 'mx', 'm'],
    marginTop: ['mt', 'my', 'm'],
    padding: ['p'],
    paddingBottom: ['pb', 'py', 'p'],
    paddingLeft: ['pl', 'px', 'p'],
    paddingRight: ['pr', 'px', 'p'],
    paddingTop: ['pt', 'py', 'p'],
    position: ['position'],
    bottom: ['bottom'],
    left: ['left'],
    right: ['right'],
    top: ['top'],
    zIndex: ['z'],
  },
};
export default Provider;

import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github/index.js';
import React from 'react';
import { LiveEditor, LiveError, LiveProvider, LivePreview } from 'react-live';
import { pipe } from 'uinix-fp';
import { Element, Icon, Layout, Text } from 'uinix-ui';

import PreviewContainer from './preview-container.js';

const scope = {
  Element,
  Icon,
  Layout,
  Text,
  pipe,
};

const LiveCode = ({ code, language, live }) => {
  if (live) {
    return (
      <LiveProvider code={code} scope={scope} theme={theme}>
        <PreviewContainer>
          <Layout spacing="l">
            <Layout boxShadow="m" flex="0 0 40%" p="s">
              <LivePreview />
            </Layout>
            <Layout flex="auto" styles={styles.editor}>
              <LiveEditor style={{ fontSize: '12px' }} />
            </Layout>
          </Layout>
          <Text color="tone.error" fontSize="s">
            <LiveError style={styles.editorInput} />
          </Text>
        </PreviewContainer>
      </LiveProvider>
    );
  }

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const styles = {
  editor: {
    maxHeight: 'height.editor',
    overflow: 'auto',
    '> div': {
      flex: 'auto',
      height: 'max-content',
    },
  },
};

export default LiveCode;

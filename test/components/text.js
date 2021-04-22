import React from 'react';

import { Text } from '../../index.js';
import { mountWithTheme } from '../util/mount-with-theme.js';

describe('Text', () => {
  it('should render', () => {
    expect(() =>
      mountWithTheme(<Text>The quick brown fox jumps over the lazy dog.</Text>),
    );
  });
});
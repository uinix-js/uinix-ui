import React from 'react';

import { Icon } from '../../index.js';
import { mountWithTheme } from '../util/mount-with-theme.js';

describe('Icon', () => {
  it('should render', () => {
    expect(() => mountWithTheme(<Icon icon="x" />));
  });
});

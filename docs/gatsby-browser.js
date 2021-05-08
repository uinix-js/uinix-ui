import React from 'react';

import Provider from './src/provider.js';

export const wrapRootElement = ({element}) => {
  return <Provider>{element}</Provider>;
};

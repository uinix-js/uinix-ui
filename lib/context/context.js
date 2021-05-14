import {createContext} from 'react';

import {createSystem} from '../system/index.js';

export {Context};

const Context = createContext(createSystem());

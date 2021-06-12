import {createContext} from 'react';

import {createSystem} from '../system/create.js';

export {Context};

const Context = createContext(createSystem());

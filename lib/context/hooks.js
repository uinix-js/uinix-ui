import {useContext} from 'react';
import {useFela} from 'react-fela';
import {props} from 'uinix-fp';

import {Context} from './context.js';

export {useCss, useIcon, useStyles, useSystem, useTheme, useVariant};

const useCss = (props) => useFela(props).css;

const useIcon = (icon) => useSystem().icons[icon];

const useStyles = () => useSystem().styles.definitions;

const useSystem = () => useContext(Context);

const useTheme = () => useSystem().theme;

const useVariant = (variant) => props(variant)(useSystem().styles);

import {combineRules} from 'fela';
import {render} from 'fela-dom';
import {createMap, getValue} from 'nanostores';
import {props} from 'uinix-fp';

import {createRenderer} from '../renderer/create-renderer.js';
import {createSystem} from './create.js';

export {
  load,
  useCss,
  useH,
  useIcon,
  useStyles,
  useSystem,
  useTheme,
  useTypographyVariant,
  useVariant,
};

let store;

const load = (h, providedSystem) => {
  const system = createSystem(providedSystem);
  const renderer = createRenderer(system);
  const css =
    (props = {}) =>
    (...rules) =>
      renderer.renderRule(combineRules(...rules), {
        ...props,
        theme: system.theme,
      });

  render(renderer);

  store = createMap(() => {
    store.setKey('css', css);
    store.setKey('h', h);
    store.setKey('system', system);
  });
};

const useCss = (props) => getValue(store).css(props);

const useH = () => getValue(store).h;

const useIcon = (icon) => useSystem().icons[icon];

const useStyles = () => useSystem().styles;

const useSystem = () => getValue(store).system;

const useTheme = () => useSystem().theme;

const useTypographyVariant = (variant) =>
  props(`typography.variants.${variant}`)(useSystem().styles);

const useVariant = (variant) =>
  props(`variants.${variant}`)(useSystem().styles);

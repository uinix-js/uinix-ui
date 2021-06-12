import {combineRules} from 'fela';
import {render} from 'fela-dom';
import {createMap, getValue} from 'nanostores';
import {props} from 'uinix-fp';

import {createRenderer} from '../renderer/create-renderer.js';
import {createSystem} from './create.js';

export {
  load,
  useCss,
  useIcon,
  useStyles,
  useSystem,
  useTheme,
  useTypographyVariant,
  useVariant,
};

let store;

const load = (providedSystem) => {
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
    store.setKey('system', system);
    store.setKey('css', css);
  });
};

const useCss = (props) => getValue(store).css(props);

const useIcon = (icon) => useSystem().icons[icon];

const useStyles = () => useSystem().styles;

const useSystem = () => getValue(store).system;

const useTheme = () => useSystem().theme;

const useTypographyVariant = (variant) =>
  props(`typography.variants.${variant}`)(useSystem().styles);

const useVariant = (variant) =>
  props(`variants.${variant}`)(useSystem().styles);

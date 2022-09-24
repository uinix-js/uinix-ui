import {merge} from 'uinix-fp';
import {createTheme} from 'uinix-theme';

const defaultSystem = {
  icons: {},
  styles: {
    rules: {},
    static: {},
    variants: {},
  },
  theme: {},
  themeSpec: {},
};

export const createSystem = (system = defaultSystem) => {
  return merge(defaultSystem)({
    ...system,
    theme: createTheme(system.theme, system.themeSpec),
  });
};

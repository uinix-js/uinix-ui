import {merge} from 'uinix-fp';

export const createSystem = (system = defaultSystem) => {
  return merge(defaultSystem)({
    ...system,
    theme: createTheme(system.theme, system.themeSpec),
  });
};

const defaultSystem = {
  icons: {},
  styles: {
    global: {},
    rules: {},
    variants: {},
  },
  theme: {},
  themeSpec: {},
};

const createTheme = (theme, themeSpec) =>
  // @ts-ignore (insufficient TS-inference)
  Object.fromEntries(
    Object.keys(themeSpec ?? {}).map((themeProperty) => [
      themeProperty,
      (theme && theme[themeProperty]) ?? {},
    ]),
  );

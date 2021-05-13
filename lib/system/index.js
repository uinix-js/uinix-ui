import {createIcons} from './icons.js';
import {createOptions} from './options.js';
import {createStyles} from './styles.js';
import {createTheme} from './theme.js';
import {createTypography} from './typography.js';

export {createSystem};

const createSystem = (overrideSystem) => {
  const {
    icons: overrideIcons,
    options: overrideOptions,
    styles: overrideStyles,
    typography: overrideTypography,
    theme: overrideTheme,
  } = overrideSystem;

  const icons = createIcons(overrideIcons);
  const options = createOptions(overrideOptions);
  const typography = createTypography(overrideTypography);
  const styles = createStyles(overrideStyles, typography);
  const theme = createTheme(overrideTheme);

  return {
    icons,
    options,
    typography,
    styles,
    theme,
  };
};

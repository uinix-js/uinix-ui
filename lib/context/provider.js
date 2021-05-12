import {createElement} from 'react';
import {RendererProvider, ThemeProvider} from 'react-fela';
import {merge} from 'uinix-fp';
import {createTheme} from 'uinix-theme';

import {createRenderer} from '../renderer/create-renderer.js';
import {createStyles} from '../styles/create-styles.js';
import {createTypography} from '../styles/create-typography.js';
import {Context} from './context.js';
import {defaults} from './defaults.js';

export {Provider};

const Provider = (props) => {
  const {
    children,
    system: overrideSystem,
    options: overrideOptions = defaults.options,
  } = props;

  const {
    icons: overrideIcons,
    styles: overrideStyles,
    typography: overrideTypography,
    theme: overrideTheme,
  } = overrideSystem;

  const icons = merge(defaults.icons)(overrideIcons);
  const options = merge(defaults.options)(overrideOptions);
  const typography = createTypography(overrideTypography);
  const styles = createStyles(overrideStyles, typography);
  const theme = createTheme(overrideTheme);

  const system = {
    icons,
    options,
    styles,
    theme,
    typography,
  };

  const renderer = createRenderer({
    options,
    styles,
    theme,
    typography,
  });

  return createElement(
    RendererProvider,
    {renderer},
    createElement(
      ThemeProvider,
      {theme},
      createElement(
        Context.Provider,
        {
          value: system,
        },
        children,
      ),
    ),
  );
};

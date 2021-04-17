export { Provider };

import { createElement } from 'react';
import { RendererProvider, ThemeProvider } from 'react-fela';
import { merge } from 'uinix-fp';
import { createTheme } from 'uinix-theme';

import { Context } from './context.js';
import { createRenderer } from './create-renderer.js';
import { defaults } from './defaults.js';

const Provider = (props) => {
  const {
    children,
    icons: overrideIcons = defaults.icons,
    options: overrideOptions = defaults.options,
    styles: overrideStyles = defaults.styles,
    theme: overrideTheme = defaults.theme,
  } = props;

  const icons = merge(defaults.icons, overrideIcons);
  const options = merge(defaults.options, overrideOptions);
  const styles = merge(defaults.styles, overrideStyles);
  const theme = createTheme(overrideTheme);

  const renderer = createRenderer({
    globalStyles: styles.global,
    isAtomicCss: options.isAtomicCss,
    theme,
  });

  return createElement(
    RendererProvider,
    { renderer },
    createElement(
      ThemeProvider,
      { theme },
      createElement(
        Context.Provider,
        {
          value: {
            icons,
            options,
            styles,
            theme,
          },
        },
        children,
      ),
    ),
  );
};

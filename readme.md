# uinix-ui

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

Minimal primitives to build and compose rich UIs.

---

## Intro

> TODO

## Contents

- [Install](#install)
- [Usage](#usage)
  - [Configuring a `Provider`](#configure-a-provider)
  - [Using primitives](#using-primitives)
  - [Building your own components](#building-your-own-components)
- [API](#api)
  - [Components](#components)
  - [Hooks](#hooks)
  - [Theme](#theme)
- [Presets](#presets)
- [UI Systems](#ui-systems)
- [Related](#related)
- [Author's Note](#authors-note)

## Install

`uinix-ui` is an [ESM][] module requiring Node 12+. [React 17+][react] is also required as a peer dependency.

```sh
npm install react github:uinix-js/uninix-ui
```

> `uinix-ui` is in active development.  A formal NPM package will be released in the near future.  Please install from the Github repo for now.

## Usage

> TODO

### Configuring a `Provider`

```js
import { Provider } from 'uinix-ui';

const MyApp = () => {
  return (
    <Provider
      icons={icons}
      options={options}
      styles={styles}
      theme={theme}>
      <MyPageLayout>
        page content
      </MyPageLayout>
    </Provider>
  );
}

const icons = {
  x: '<svg>...</svg>',
  search: '<svg>...</svg>',
};

const hoverStyle = props => {
  const { theme, onClick } = props;
  const isClickable = onClick;
  return {
    cursor: isClickable ? 'pointer': undefined,
    'hover': {
      opacity: isClickable ? theme.opacities.clickable: undefined,
    },
  };
};

const styles = {
  components: {
    Icon: [hoverStyle],
  },
  global: {
    body: {
      fontFamily: 'body',
    },
    // ...
  },
  rules: {
    container: {
      width: '768px',
    },
    fullViewport: {
      height: '100vh',
    }
  }
};

const options = {
  isAtomicCss: true,
};

const theme = {
  fonts: {
    body: 'system-ui',
  },
  sizes: {
    icon: {
      s: 16,
      m: 20,
      l: 24,
    }
  },
  spacings: {
    s: 8,
    m: 16,
    l: 32,
  },
  opacities: {
    clickable: 0.8,
    hidden: 0,
    visible: 1,
  },
  // ...
};
```

### Using primitives

```js
import { Element, Layout, Icon, useStyleRules } from 'uinix-ui';


function MyPageLayout({ children }) {
  const handleClose = () => console.log('closed');
  const styleRules = useStyleRules();

  return (
    <Layout direction="column" spacing="l" styles={[styleRules.fullViewport]}>
      <Layout
        as="header"
        align="center"
        flex="none"
        justify="spacing-between"
        px="m"
        py="s"
        spacing="m">
        <Element
          as="h1"
          styles={[logoStyle]}>
          Logo
        </Element>
        <Icon icon="search" size="icon.m" onClick={handleClose} />
      </Layout>
      <Layout
        as="main"
        flex="auto"
        styles={[styleRules.containerStyle]}>
        {content}
      </Layout>
    </Layout>
  );
}
```

### Building your own components

```js
import { Element, Layout } from 'uinix-ui';

function MyCard({ children, title }) {
  return (
    <Layout direction="column" spacing="m">
      <Element as="h2">{title}</Element>
      {children}
    </Layout>
  );
}

function MyContent() {
  return (
    <Layout direction="column" spacing="l">
      <Card title="Card 1">
        Card contents
      </Card>
      <Card title="Card 1">
        Card contents
      </Card>
      <Card title="Card 1">
        Card contents
      </Card>
    </Layout>
  );
}
```

## API

### Components

> TODO

### Hooks

> TODO

### Theme

> TODO

## Presets

The following are presets that quickly allow building custom UI systems.
- [`uinix-ui-preset-simple`][uinix-ui-preset-simple]


## UI Systems

With `uinix`, it is extremely simple to build and maintain UI systems.

Please visit the [demos][] page to view demos of these UI systems:
- Discord
- Github
- Instagram
- Reddit
- Simple
- Slack
- Spotify

## Related

- [`uinix`][uinix]
- [`uinix-theme`][uinix-theme]
- [`uinix-ui-preset-simple`][uinix-ui-preset-simple]
- [`uinix-ui-system-simple`][uinix-ui-system-simple]
- [`uinix-ui-system-demos`][uinix-ui-system-demos]
- [`theme-ui`][theme-ui]

## Author's Note

I enjoy studying design and UI systems, and follow a lot of contributors who pioneered exciting ideas in this area.  Over the years, projects such as [`rebass`][rebass], [`theme-ui`][theme-ui], and [`fela`][fela] have heavily influenced the way I approached frontend development.  All this time, there is still something lacking that is constantly bothering me, and that is the following question:

> Have we truly boiled down to a minimal set of primitives with good configuration?

The philosophy of [`uinix`][uinix] is to adopt the [Unix philosophy][unix-philosophy] in building UIs:
- Write programs that do one thing and do it well.
- Write programs to work together.
- Favor composability.

`uinix-ui` is an exploration of supporting a reliable and methodical way to build complex UIs, through the use of just:
- Three primitive components: `Element`, `Icon`, `Layout` (the latter two being derivatives of the former)
- A formal [theme specification][uinix-theme] that supports extension and composition with the primitives.
- Thoughtful decisions on the interoperability and composability of components and programs.

As a personal challenge, I enjoy reverse-engineering problems to explore if common themes exist.  With `uinix-ui`, I hope to personally rise above the challenge, and demonstrate that many [UI Systems](#ui-systems) can be rapidly configured and bootstrapped.

## TODO

- [ ] `fela-plugin-negative-unit`
- [ ] set up presets e.g. `uinix-ui-preset-simple`
- [ ] native support for font faces.
- [ ] docs
- [ ] cypress tests
- [ ] support custom `h` (`createElement`) with `react` as the default.
- [ ] Systems: `uinix-ui-system`, `uinix-ui-system-demos` (google, spotify, reddit, instagram, discord, slack)

<!-- badges -->
[build-badge]: https://github.com/uinix-js/uinix-ui/workflows/main/badge.svg
[build]: https://github.com/uinix-js/uinix-ui/actions
[coverage-badge]: https://img.shields.io/codecov/c/github/uinix-js/uinix-ui.svg
[coverage]: https://codecov.io/github/uinix-js/uinix-ui
[downloads-badge]: https://img.shields.io/npm/dm/uinix-ui.svg
[downloads]: https://www.npmjs.com/package/uinix-ui
[bundle-size-badge]: https://img.shields.io/bundlephobia/minzip/uinix-ui.svg
[bundle-size]: https://bundlephobia.com/result?p=uinix-ui

<!-- defs -->
[demos]: https://uinix-ui-systems.netlify.com
[esm]: https://nodejs.org/api/esm.html
[fela]: https://github.com/robinweser/fela
[react]: https://github.com/facebook/react
[rebass]: https://github.com/rebassjs/rebass
[theme-ui]: https://github.com/system-ui/theme-ui
[uinix]: https://github.com/uinix-js
[uinix-theme]: https://github.com/uinix-js/uinix-theme
[uinix-ui-preset-simple]: https://github.com/uinix-js/uinix-ui-preset-simple
[uinix-ui-system-demos]: https://github.com/uinix-js/uinix-ui-system-demos
[uinix-ui-system-simple]: https://github.com/uinix-js/uinix-ui-system-simple
[unix-philosophy]: https://en.wikipedia.org/wiki/Unix_philosophy

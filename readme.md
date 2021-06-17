# uinix-ui

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

A minimal framework-agnostic UI system to build UI systems.

---

## Intro

> Your system, your rules 🤘.

**uinix-ui** is a UI system to build UI systems, and follows a few principles:

- It is framework-agnostic but framework-friendly 🤗.  It plays well with [React], [Preact], [Vue], [htm], and, any [hyperscript]-based API.
- It is a minimal UI system that ships with just four components (`Element`, `Icon`, `Layout`, `Text`) and interoperates well with system specs (`theme`, `icons`, `styles`).
- It is unopinionated but configurable.
- It intends to stay minimal and simple, and do just a few things well, adhering to the [Unix philosophy][unix-philosophy] 🐧.
- It improves visibility of your UI [system knowledge](system-knowledge) 📖.

These principles allow you to fully control and build UI systems without deep knowledge and commitment to **uinix-ui**.

## Contents

- [Install](#install)
- [Usage](#usage)
  - [Creating the system](#creating-the-system)
  - [Loading the system](#loading-the-system)
  - [Using components](#using-components)
  - [Using system hooks](#using-system-hooks)
- [API](#api)
  - [System](#system)
    - [`createIcons(icons)`](#createiconsicons)
    - [`createStyles(styles)`](#createstylesstyles)
    - [`createSystem(system)`](#createsystemsystem)
    - [`createTheme(theme)`](#createthemetheme)
    - [`load(system)`](#loadsystem)
    - [`useCss()`](#usecss)
    - [`useIcon(icon)`](#useiconicon)
    - [`useStyles()`](#usestyles)
    - [`useSystem()`](#usesystem)
    - [`useTheme()`](#usetheme)
    - [`useVariant(variant)`](#usevariantvariant)
  - [Components](#components)
    - [`Element(props)`](#elementprops)
    - [`Icon(props)`](#iconprops)
    - [`Layout(props)`](#layoutprops)
    - [`Text(props)`](#textprops)
  - [Utils](#utils)
    - [`merge(o1)(o2)`](#mergeo1o2)
- [Frameworks](#frameworks)
  - [React](#react)
  - [Preact](#preact)
  - [Vue](#vue)
  - [hyperscript](#hyperscript)
  - [htm](#htm)
- [Guides](#guides)
- [System Knowledge](#system-knowledge)
  - [Definition](#definition)
  - [Complexity](#complexity)
  - [Expressions](#expressions)
  - [Tools](#tools)
- [Related](#related)
- [Project](#project)
  - [Comparison](#comparison)
  - [Types](#types)
  - [Version](#version)
  - [Contribute](#contribute)
  - [Backstory](#backstory)
  - [License](#license)

## Install

**uinix-ui** is an [ESM] module requiring Node 12+.

```sh
npm install github:uinix-js/uninix-ui
```

> **uinix-ui** is in active development.  A formal NPM package will be released in the near future.  Please install from the Github repo for now.

## Usage

### Creating the system

A `system` is an object that acts as a source of truth for UI system specs.

Use the respective `create*` utilities to create a valid `system` of `icons`, `styles`, and `theme`.

```js
import React from 'react';
import {
  createIcons,
  createStyles,
  createSystem,
  createTheme,
} from 'uinix-ui';

/**
 * System configuration
 *
 * A value for h (createElement) compatible with your respective
 * UI framework must be specified.
 **/
const config = createConfig({
  h: React.createElement,
});

/**
 * System icons
 *
 * Organize all SVG-based icons by name in a map.
 */
const icons = createIcons({
  code: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  up: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="16" x2="12" y2="8"/></svg>',
});

/**
 * System theme
 *
 * Creates a compliant uinix-theme theme object.
 */
const theme = createTheme({
  borders: {
    bordered: `1px solid #eee`,
  },
  colors: {
    background: {
      primary: '#fff',
    },
    brand: {
      primary: '#0366d6',
    },
  },
  opacities: {
    invisible: '0',
    disabled: '0.3',
    interactive: '0.7',
    visible: '1',
  },
  sizes: {
    icon: {
      s: '16px',
      m: '24px',
      l: '32px',
    },
    widths: {
      container: '768px',
    },
  },
  spacings: {
    xs: '0.25rem',
    s: '0.5rem',
    m: '1rem',
    l: '2rem',
    xl: '4rem',
  },
  transitions: {
    fade: 'opacity 0.2s ease-in-out',
  },
});

/**
 * System styles
 *
 * Specify breakpoints, global styles, style variants, and custom styles.
 * Styles should reference theme values to facilitate theme-driven UI
 * development.
 */
const styles = createStyles({
  breakpoints: ['480px', '768px'],
  global: {
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      backgroundColor: 'background.primary',
      margin: 0,
      padding: 0,
    },
    hr: {
      border: 'bordered',
      width: '100%',
    },
  },
  // Custom style rules
  interactive: ({onClick}) => ({
    cursor: onClick ? 'pointer' : undefined,
    transition: 'fade',
    ':hover': {
      opacity: onClick ? 'interactive' : undefined,
    },
  });
});

/**
 * System
 *
 * Source of truth for all UI system specs.
 */
const system = createSystem({
  config,
  icons,
  styles,
  theme,
});
```

### Loading the system

Load your `system` in an appropriate place of your application.

```js
import {load} from 'uinix-ui';

import system from './my-system.js'

load(system);
```

> **Note:** Your `system` should be a static and immutable object and should be `load`ed just once.  In frameworks like [React], you can `load` your system in the main application module or in a `useEffect` hook.

### Using components

To use **uinix-ui** components, you need to first ensure that `system.config.h` is configured for your appropriate UI framework (e.g. [React], [Preact], [Vue], [hyperscript], [htm]).

```js
import React from 'react';
import {createSystem, load} from 'uinix-ui';

const config = {
  h: React.createElement
};

const system = createSystem({
  config,
  // ...
});

load(system);
```

> **Note**: `h` is a common alias for [hyperscript]'s `createElement` API.  Many popular UI frameworks support this `h`-based signature when creating elements.

Once your `system` is configured and `load`ed, you can start using components!  The following example provides a high level [React]-specific example building a canonical `PageLayout` component using just the four component primitives (`Element`, `Icon`, `Layout`, `Text`).  For framework-specific examples, please refer to the [Frameworks](#frameworks) section.

```js
import {load, Element, Icon, Layout, Text} from 'uinix-ui';

import system from './my-system.js';

load(system);

const containerStyle = {
  maxWidth: 'width.container',
};

const PageLayout = ({children, title}) => {
  return (
    <Layout direction="column" spacing="m" styles={containerStyle}>
      <Layout as="header" justify="space-between" spacing="m">
        <Text as="h1">{title}</Text>
        <Icon color="brand.primary" icon="up" size="icon.m" />
      </Layout>
      <Layout as="main" flex="auto" direction="column">
        {children}
      </Layout>
      <Element as="footer">
        <Layout as="nav" spacing="m">
          <Element as="li" variant="nav.item">
            <a href={link1}>
              Link 1
            </a>
          </Element>
        </Layout>
      </Element>
    </Layout>
  );
};
```

More details on using and configuring components are covered in the [API](#api) section.

### Using system hooks

After `load`ing your `system`, **uinix-ui** components are *system-aware* and have access to your `system` specs.  This is useful if you wish to access system specs to compose components using the primitives.

```js
import {Element, Text, useStyles, useTheme} from 'uinix-ui';

const Button = ({text, onClick}) => {
  // Retrieve system.styles
  const styles = useStyles();
  // Retrieve system.theme
  const theme = useTheme();

  // Easily compose styles in array-form
  const buttonStyle = [
    // Reuse and apply an existing style defined in system.styles
    styles.interactive,
    // Define custom styles
    {
      ':active': {
        // Reference a value in system.theme
        // An equivalent expression can also be specified by its theme key
        // (e.g. "brand.primary")
        color: theme.colors.brand.primary,
      },
    },
  ];

  return (
    <Element
      as="button"
      onClick={onClick}
      styles={buttonStyle}>
      <Text variant="button">{text}</Text>
    </Element>
  )
}
```


## API

### System

#### `createConfig(config)`

#### `createIcons(icons)`

#### `createStyles(styles)`

#### `createSystem(system)`

#### `createTheme(theme)`

#### `load(system)`

#### `useCss()`

#### `useIcon(icon)`

#### `useStyles()`

#### `useSystem()`

#### `useTheme()`

#### `useVariant(variant)`

### Components

#### `Element(props)`

#### `Icon(props)`

#### `Layout(props)`

#### `Text(props)`

### Utils

#### `merge(o1)(o2)`

## Frameworks

**uinix-ui** is framework-agnostic but framework-friendly 🤗.  It plays well with [React], [Preact], [Vue], [htm], and, any [hyperscript]-based API.  This is simply configured by specifying the appropriate `h` value in `system.config.h`.

The following sections contain Codesandbox links to identical examples expressed differently in the corresponding UI framework.

### [React]
[![react][codesandbox-badge]](https://codesandbox.io/s/)

### [Preact]
[![react][codesandbox-badge]](https://codesandbox.io/s/)

### [Vue]
[![react][codesandbox-badge]](https://codesandbox.io/s/)

### [hyperscript]
[![react][codesandbox-badge]](https://codesandbox.io/s/)

### [htm]
[![react][codesandbox-badge]](https://codesandbox.io/s/)

## Guides

A collection of interactive [guides][uinix-docs-uinix-ui] on recipes and best practices can be found in the progressive [uinix-docs] website!

You can also view demos of [UI systems][uinix-docs-ui-systems] reverse-engineered and rebuilt with **uinix-ui**.

## System Knowledge

### Definition

### Complexity

### Expressions

### Tools

## Related
- [uinix-js]: The uinix ecosystem promoting Unix-like UI development.
- [uinix-docs]: Progressive docs for the uinix ecosystem.
- [uinix-fp]: FP utilities for authoring common JS utilities in functional form.
- [uinix-theme]: uinix theme spec and utilties
- [UI Systems and Complexity Whitepaper][ui-systems-and-complexity-whitepaper]: Whitepaper on system knowledge and managing complexity in UI systems.

## Project

### Comparison

There are tons of UI and design systems and a few examples are listed below:
- Bootstrap
- Ant Design
- Material UI
- Semantic UI
- Theme UI

**uinix-ui**'s main differences with most of these libraries are:
- It is designed as a UI system  to build UI systems, and not as a library to enforce specific design/UI patterns.  This is clearly evident in how **uinix-ui** is unstyled (and ugly 😭) by default!
- It is framework-agnostic so you can use it with any [hyperscript]-based API.  Popular frameworks such as [React], [Preact], and [Vue] all play nice with it 👍.
- It is a minimal UI system, and therefore its API exposes only the neccessary primitives.  It is definitely *not a batteries-included* ❌ 🔋 library.
- It is generally unopinionated about how you use it.  You can achieve the same outcome in many ways with **uinix-ui**.  There is a [Guides](#guides) section that provides best practices and recipes, but the library itself does not impose anything on you.  As mentioned earlier: *Your system, your rules 🤘.*

While the ecosystem of UI system libraries solve for different problems and needs, **uinix-ui** provides something lacking in the ecosystem,

> A minimal framework-agnostic UI system to build UI systems.

If you are looking to build custom UI systems from scratch, without a dependency on UI frameworks, without wanting to wrap (often awkwardly) around opinionated design systems, and want full control on the specification of your [system knowledge](#system-knowledge), then **uinix-ui** should meet these needs well!

### Types
This package ships with [Typescript] declarations, compiled and emitted when installed.  The source code is pure Javascript.

### Test

Tests are authored in [Cypress].  Build, format, test, and check type/test coverage with `npm test`.  Use `npm run cypress-open` to run tests with the interactive Cypress test runner, or `npm run cypress-run` to run tests with the CLI.

### Version
**uinix-ui** will adhere to [semver] starting from 1.0.0.

### Contribute
There are currently no formal contribution guidelines.  [Issues] and [pull requests][pull-requests] are welcome!

### Backstory
Development for **uinix-ui** started formally around April, 2021, shortly after publishing thoughts on a [whitepaper][ui-systems-and-complexity-whitepaper] exploring UI systems and complexity.

Informal development has always been a progression of my personal inspirations over the years following [@jxnblk]'s monumental work and iterations on [rebass], [styled-system] and [theme-ui].  The key ideas in [theme-ui] form the main foundations of **uinix-ui**.

It is not until an encounter with [@robinweser]'s beautiful ecosystem of style plugins in [fela], that I became extremely excited that one could implement features in [theme-ui] with minimal code.  The [React] POC was implemented up until [`2434023`][2434023], and was beginning to take shape.

Stumbling on [@ai]'s 152byte [nanostores] (what is this sorcery 🤯) led to a pivotal attempt to decouple **uinix-ui** from React, accomplished in [`2434023`][2434023], transforming **uinix-ui** into a framework-agnostic UI system library.

[@wooorm]'s inspirational and profilic work in [unified] and open-source provided guidance on both the philosophy and approach on how this library was written.  Nothing is accidental, and everything is deliberate.  This includes:
- focusing on ESM.
- intentionally decoupling source code from [Typescript].
- building a clear scope and goal for **uinix-ui**, and the uinix ecosystem in general.

**uinix-ui** is intended to be minimal, and do just a few things, but hopefully well (adhering to the [Unix philosophy][unix-philosophy]).  My metric for success for the project is for it to become stable and update-free in the near future.  **uinix-ui**'s minimal APIs should aim to make building UI systems and UIs simple and enjoyable.  We shall see how that goes.

Thank you for reading this backstory!

### License
[MIT][license] © [Chris Zhou][@chrisrzhou]


<!-- project -->
[build]: https://github.com/uinix-js/uinix-ui/actions
[build-badge]: https://github.com/uinix-js/uinix-ui/workflows/main/badge.svg
[bundle-size]: https://bundlephobia.com/result?p=uinix-ui
[bundle-size-badge]: https://img.shields.io/bundlephobia/minzip/uinix-ui.svg
[codesandbox-badge]: https://codesandbox.io/static/img/play-codesandbox.svg
[coverage]: https://codecov.io/github/uinix-js/uinix-ui
[coverage-badge]: https://img.shields.io/codecov/c/github/uinix-js/uinix-ui.svg
[downloads]: https://www.npmjs.com/package/uinix-ui
[downloads-badge]: https://img.shields.io/npm/dm/uinix-ui.svg
[issues]: https://github.com/uinix-js/uinix-ui/issues
[license]: https://github.com/uinix-js/uinix-ui/blob/main/license
[pull-requests]: https://github.com/uinix-js/uinix-ui/pulls
[2434023]: https://github.com/uinix-js/uinix-ui/commit/2434023c199670b6b6014f77f17b214c11709832

<!-- defs -->
[@ai]: https://github.com/ai
[@chrisrzhou]: https://github.com/chrisrzhou
[@jxnblk]: https://github.com/jxnblk
[@robinweser]: https://github.com/robinweser
[@wooorm]: https://github.com/wooorm
[cypress]: https://github.com/cypress-io/cypress
[demos]: https://systems.uinix.dev
[esm]: https://nodejs.org/api/esm.html
[fela]: https://github.com/robinweser/fela
[htm]: https://github.com/developit/htm
[hyperscript]: https://github.com/hyperhype/hyperscript
[nanostores]: https://github.com/ai/nanostores
[preact]: https://github.com/preactjs/preact
[react]: https://github.com/facebook/react
[rebass]: https://rebassjs.org/
[semver]: https://semver.org
[styled-system]: https://github.com/styled-system/styled-system
[theme-ui]: https://github.com/system-ui/theme-ui
[typescript]: https://github.com/microsoft/TypeScript
[ui-systems-and-complexity-whitepaper]: https://uinix.dev/learn/ui-systems-and-complexity-whitepaper/
[uinix-docs]: https://uinix.dev
[uinix-docs-uinix-ui]: https://uinix.dev/packages/uinix-ui/
[uinix-docs-ui-systems]: https://uinix.dev/demos/systems/
[uinix-js]: https://github.com/uinix-js
[uinix-fp]: https://github.com/uinix-js/uinix-fp
[uinix-theme]: https://github.com/uinix-js/uinix-theme
[unified]: https://github.com/unifiedjs/unified
[unix-philosophy]: https://en.wikipedia.org/wiki/Unix_philosophy
[vue]: https://github.com/vuejs/vue

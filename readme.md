# uinix-ui

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

---

## Intro

**uinix-ui** is a minimal UI system to build UI systems.

It is [framework-agnostic](#frameworks) and can be used with any [hyperscript]-based view library (e.g. [React], [Preact], [Vue], [Mithril], [Solid], [htm], [Svelte]).  Its minimal [§ API](#api) of just four component primitives interoperates well with your [system knowledge](#system-knowledge) and specs.  It is unopinionated but configurable, providing simple and flexible ways to build and manage UI systems and UIs (see [§ Demos](#demos)).

> Your system your rules 🤘.

## Contents

- [Install](#install)
- [Usage](#usage)
  - [Creating the system](#creating-the-system)
  - [Loading the system](#loading-the-system)
  - [Using components](#using-components)
  - [Using system hooks](#using-system-hooks)
- [Frameworks](#frameworks)
  - [React](#react)
  - [Preact](#preact)
  - [Vue](#vue)
  - [Mithril](#mithril)
  - [Solid](#solid)
  - [htm](#htm)
  - [hyperscript](#hyperscript)
  - [Svelte](#svelte)
- [Presets](#presets)
- [Demos](#demos)
- [Guides](#guides)
- [API](#api)
  - [System](#system)
    - [`createConfig([config])`](#createconfigconfig)
    - [`createIcons([icons])`](#createiconsicons)
    - [`createTheme([theme])`](#createthemetheme)
    - [`createStyles([styles])`](#createstylesstyles)
    - [`createSystem([system])`](#createsystemsystem)
    - [`load(h[, system, config])`](#loadh-system-config)
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
- [System Knowledge](#system-knowledge)
- [Related](#related)
- [Project](#project)
  - [Comparison](#comparison)
  - [Types](#types)
  - [Test](#test)
  - [Version](#version)
  - [Contribute](#contribute)
  - [Backstory](#backstory)
  - [License](#license)

## Install

**uinix-ui** is an [ESM] module requiring Node 12+.

```sh
npm install uinix-ui
```

## Usage

**unix-ui** is framework-agnostic and can be used with any [hyperscript]-based view library.  This documentation provides examples written in [React].  See [§ Frameworks](#frameworks) for implementations in relating frameworks.

### Creating the system

A `system` represents the source of truth for your UI system.

Use the respective `create*` system utilities to create and configure a valid `system` of `icons`, `styles`, and `theme`.

```js
import {
  createIcons,
  createStyles,
  createSystem,
  createTheme,
} from 'uinix-ui';

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
 * Allows for theme-driven styles to be defined and used.
 *
 * See https://github.com/uinix-js/uinix-theme for the uinix-theme spec.
 */
const theme = createTheme({
  borders: {
    bordered: `1px solid #eee`,
  },
  /** theme values can be arbitrarily nested for organization */
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
  radii: {
    m: '4px',
    round: '50%',
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
 * Styles may/should reference theme values for theme-driven development.
 */
const styles = createStyles({
  /**
   * Defines responsive media query breakpoints (min-width based).
   * Supports responsive styles when specified in array form.
   */
  breakpoints: ['480px', '768px'],
  /**
   * Affects the global stylesheet.
   * Useful for CSS resets, styling HTML elements, and overriding vendor classes.
   */
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
  /**
   * Custom style rules can be defined as style functions or
   * style objects for reuse.
   **/
  interactive: ({onClick}) => ({
    cursor: onClick ? 'pointer' : undefined,
    transition: 'fade',
    // CSS-in-JS features supported (e.g. pseudo-selectors)
    ':hover': {
      opacity: onClick ? 'interactive' : undefined,
    },
  }),
  disabled: {
    cursor: 'not-allowed',
    opacity: 'disabled',
  },
  /** Access variant styles through the `variant` prop in uinix-ui components. */
  variants: {
    /** Variants can be arbitrarily nested for organization. */
    card: {
      default: {
        border: 'bordered',
        borderRadius: 'm',
        padding: 'm',
      }
    },
  },
});

/**
 * System
 *
 * Creates the source of truth centralizing your system specs.
 */
const system = createSystem({
  config,
  icons,
  styles,
  theme,
});
```

### Loading the system

Load your `system` with the `load` method, providing the following arguments
- [Required]: an appropriate `h` (i.e. `createElement`) function for your view library
- [Optional]: your `system`
- [Optional]: system `config`uration.

```js
import {createElement} from 'react';
import {createConfig, load} from 'uinix-ui';

import system from './my-system.js'

/**
 * System configuration
 **/
const config = createConfig({
  /**
   * Supports custom props for components that affect their relating styles.
   * e.g. <Icon bg="red" color="blue" p="m" />
   */
  elementShorthandPropsMapping: {
    backgroundColor: ['bg'],
    color: ['color'],
    margin: ['m'],
    padding: ['p'],
  },
  /**
   * Apply styles on Element component based on props.
   * e.g. <Icon onClick={() => console.log('hi')} /> will have the applied hover
   * opacity style.
   */
  elementStyles: [
    ({ onClick }) => ({
      ':hover': {
        opacity: onClick ? 'interactive': undefined,
      },
    }),
  ],
  /**
   * Renders atomic CSS styles.
   * This is useful to share atomic CSS styles and reduce the CSS bundle size.
   * See https://fela.js.org/
   */
  isAtomicCss: false,
  /**
   * Whitelists the CSS properties that can be responsive.
   * By default, nothing is responsive
   **/
  responsiveCssProperties: [
    'color',
    'padding',
  ],
});

/**
 * Load your system
 */
load(createElement, system, config);
```

> **Note:** `h` is a common alias for the `createElement` method.  It is popularized by [hyperscript], and many UI frameworks support this API for creating elements.  See [§ Frameworks](#frameworks).

> **Note:** Your `system` should be defined and loaded just once.  It should remain immutable after.

### Using components

To use **uinix-ui** components, make sure that your `system` is loaded as detailed in [§ Loading the system](#loading-the-system).  Once that is done, you are good to go!  The following [React] example outlines building a typical `PageLayout` component using the four component primitives ([`Element`](#elementprops), [`Icon`](#iconprops), [`Layout`](#layoutprops), [`Text`](#textprops)).  For framework-specific examples, please see [§ Frameworks](#frameworks).

```js
import {
  Element,
  Icon,
  Layout,
  Text,
} from 'uinix-ui';

/** Theme-based style object */
const containerStyle = {
  maxWidth: 'width.container',
};

const PageLayout = ({children, title}) => {
  /** Layout provides a simple but powerful way to build layouts! */
  return (
    <Layout
      direction="column"
      spacing="m"
      styles={containerStyle}>
      {/* The `as` prop allows easy ways to render semantic HTML element */}
      <Layout as="header" justify="space-between" spacing="m">
        <Text as="h1">{title}</Text>
        {/* Shorthand props allows easy specification of theme-based styles */}
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

More details on using and configuring components are covered in the [§ API](#api).

### Using system hooks

After `load`ing your `system`, **uinix-ui** components are *system-aware* and have access to your `system` specs.  The following example outlines how system hooks can be used to retrieve values from the `system`.

```js
import {
  Element,
  Text,
  useIcon,
  useStyles,
  useSystem,
  useTheme,
  useVariant,
} from 'uinix-ui';

const Button = ({text, onClick}) => {
  /** Retrieve system.icons[x] */
  const icon = useIcon('x');
  /** Retrieve system.styles */
  const styles = useStyles();
  /** Retrieve system */
  const system = useSystem();
  /** Retrieve system.theme */
  const theme = useTheme();
  /** Retrieve system.styles.variants[variant] */
  const variantStyle = useVariant('button.primary');

  /** Easily compose styles in array-form */
  const buttonStyle = [
    /** Reuse and apply an existing style defined in system.styles */
    styles.interactive,
    variantStyle,
    /** Define custom styles */
    {
      ':active': {
        /**
         * Reference a value in system.theme
         * An equivalent expression can also be specified by its theme key
         * (e.g. "brand.primary")
         */
        color: theme.colors.brand.primary,
      },
    },
  ];

  return (
    <Element
      as="button"
      onClick={onClick}
      styles={buttonStyle}>
      <Text variant="button.primary">{text}</Text>
    </Element>
  )
}
```

> **Note**: System hooks are framework-agnostic.  The [React] example above provides a usage pattern based on React hooks, but you can actually call system hooks anywhere in your code (outside of components) to access system values.  That's powerful!

## Frameworks

**uinix-ui** is framework-agnostic and works well with any [hyperscript]-based view library.  The CodeSandbox links below provide framework-specific implementation of the same demo built with **uinix-ui**.

### [React]
[![react][codesandbox-badge]](https://codesandbox.io/s/react-sfd37)

### [Preact]
[![react][codesandbox-badge]](https://codesandbox.io/s/preact-43ogy)

### [Vue]
[![react][codesandbox-badge]](https://codesandbox.io/s/vue-n75n8)

### [Mithril]
[![react][codesandbox-badge]](https://codesandbox.io/s/mithril-qjdnd)

### [Solid]
[![react][codesandbox-badge]](https://codesandbox.io/s/solid-js-qpfsq)

### [htm]
#### `htm/preact`
[![react][codesandbox-badge]](https://codesandbox.io/s/htmpreact-owo3r)

#### `htm/react`
[![react][codesandbox-badge]](https://codesandbox.io/s/htmreact-j81qk)

### [hyperscript]
[![react][codesandbox-badge]](https://codesandbox.io/s/hyperscript-7dt93)

> **Note**: [hyperscript] does not support SVG (see [#7](https://github.com/hyperhype/hyperscript/issues/7)) and the [`Icon`](#iconprops) component does not work in this demo.  You may wrap or use another hyperscript-based `h` function instead (e.g. [Mithril]'s `m` method is a good replacement).

### [Svelte]
[![react][codesandbox-badge]](https://codesandbox.io/s/svelte-podxh)

> This demo is not fully functional. I am unfamiliar and unable to pass Svelte component `slots` into **uinix-ui** components. Currently, all slots are rendered as siblings instead of children 😭.  Please help improve on this example if you are more familiar with the relevant Svelte best practices.

## Presets

Presets are shareable system configurations that you can simply [`load`](#loadh-system-config).

```js
import {load} from 'uinix-ui';
import themeUiPreset from 'uinix-ui-preset-theme-ui';

load(...themeUiPreset);
```

- `uinix-ui-preset-theme-ui`
- `uinix-ui-preset-uinix`

> **Note**: The links above will be active once the presets are production-ready.

## Demos
View demos of UI systems that are reverse-engineered and built using **uinix-ui** with [this link][uinix-docs-ui-systems].

## Guides

View interactive guides on **uinix-ui** recipes and best practices with [this link][uinix-docs-uinix-ui].

## API

> **Note**: **uinix-ui** ships with [Typescript] declarations, compiled and emitted when installed.  The Javascript source code is documented in [JSDoc].  These supplement the documentation in this section with an exploratory API through code.

### System

#### `createConfig([config])`

#### `createIcons([icons])`

#### `createTheme([theme])`

#### `createStyles([styles])`

#### `createSystem([system])`

#### `load(h[, system, config])`

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

## System Knowledge

System knowledge refers to our understanding of systems. As software systems grow, complexity inevitably grows with the independent ways components in a system can interact with each other.  Our understanding of systems is directly related to our knowledge of these interactions.

It is common practice to abstract and flatten shareable code for reuse, to decrease system complexity.  However, this is not always true because wrong abstractions and indirections may actually increase complexity in a system.

**uinix-ui** provides a way for system specs to be defined in a centralized `system` object, and provides ways for interoperable components to interface with it.  This improves our system knowledge by allowing the `system` source of truth to be easily accessible.  While this is helpful in managing complexity in UI systems to some degree, we continue to advice implementors that complexity will continue to grow with decisions that are made outside of **uinix-ui** (e.g. when building custom components).

In **uinix-ui**, the decisions and designs of the system can be captured and applied in different ways, as illustrated in the following example on how we can achieve the same styling goals for a custom component with different approaches.

```js
import {createElement} from 'react';
import {createSystem, load, useStyles} from 'uinix-ui';

// a.js
load(
  createElement,
  createSystem({
    styles: {
      card: {
        borderRadius: 'm',
        boxShadow: 'm',
        padding: 'm',
      },
    },
  }),
);

const Component = ({children}) => {
  const styles = useStyles();
  return <Element styles={styles.card}>{children}</Element>
}

// b.js
load(
  createElement,
  createSystem({
    styles: {
      variants: {
        card: {
          borderRadius: 'm',
          boxShadow: 'm',
          padding: 'm',
        },
      },
    },
  }),
);

const Component = ({children}) => {
  return <Element variant="card">{children}</Element>
}

// c.js
load(createElement);

const Component = ({children}) => {
  const cardStyle = {
    borderRadius: 'm',
    boxShadow: 'm',
    padding: 'm',
  };
  return <Element styles={cardStyle}>{children}</Element>
}
```

All three approaches above arrive to the same styling goals, but the system knowledge is managed differently in each approach:
- In `a.js`, we made a decision to track the card style formally in `system.styles`.  The style can then be retrieved with the `useStyles` API.  Although this is sourcing styles from the system, implementors may override with additional style properties in consuming code, leading to untracked complexity living outside of the `system`.
- In `b.js`, we made a decision to track the card style as a style variant in `system.styles.variants`.  When accessed through the `variant` prop in **uinix-ui** components, this indicates an explicit application of styles that cannot be overriden since this is a private implementation of styles by **uinix-ui** components.
- In `c.js`, we made a decision *not* to define the card style in the `system`, and to define it in the consuming component.  This decision may make sense if the goal is to keep the styling details as a private implementation in `Component`, instead of capturing it in the `system`.

It is important to note that none of the approaches above is better than the other.  The "best" approach depends on the goals of the system and how it will be used.  **uinix-ui** is unopinionated on how you organize your `system`, but it provides a minimal API to help you easily define, manage, and access your `system`.  With easy access to the `system`, you can surface and visualize your system with [meaningful renderers][uinix-docs-ui-systems], thus improving our system knowledge by making it easy to inspect the design decisions made in the system.

For further reading on system knowledge, this [whitepaper][ui-systems-and-complexity-whitepaper] provides an interactive exploration of the subject matter.

## Related
- [uinix-js]: The uinix ecosystem of minimalist tools for UI development.
- [uinix-docs]: Progressive docs for the uinix ecosystem.
- [uinix-fp]: FP utilities for authoring common JS utilities in functional form.
- [uinix-theme]: uinix theme spec and utilties

## Project

### Comparison

While the vibrant ecosystem of UI system libraries solve for different problems and needs, they usually involve a commitment to a larger ecosystem of tools and frameworks.  For example, [theme-ui] is an incredible UI system library, but unfortunately works only for [React]-based development.

**uinix-ui** is fortunate to be built on the shoulders of giants 💪 (specifically [theme-ui], and [fela]), implementing the best ideas and features of these libraries (e.g. theme-driven development, CSS-in-JS, atomic CSS, responsive APIs), while exposing a minimal and framework-agnostic API.

**uinix-ui** differs primarily from other UI libraries in the following design principles:
- It is designed as a UI system to build UI systems, and not as a system to manage opinionated design and UI patterns.  This is clearly evident in the fact that **uinix-ui** ships as an unstyled (and ugly 😭) package if left unconfigured!
- It is designed from the ground up to be framework-agnostic.  Popular frameworks such as [React], [Preact], [Vue], [Mithril], [Solid], [htm], and any [hyperscript]-based view library all play nice with it 👍.
- It is designed to be a minimal UI system, and its API will expose only the neccessary primitives.  It is definitely *not a batteries-included* ❌ 🔋 library.
- It is designed to be unopinionated.  You can implement the same behaviors in different ways with **uinix-ui**.  There are [guides](#guides) that provide best practices and common recipes, but the library itself does not impose how you should organize your system and components.  As stated earlier: *Your system, your rules 🤘.*

If you are looking to build custom UI systems from scratch, without a dependency on UI frameworks, without wanting to wrap (often awkwardly) around opinionated design systems, and wanting to fully control your system specs and [system knowledge](#system-knowledge), then **uinix-ui** should meet those needs well!

### Types
This package ships with [Typescript] declarations, compiled and emitted when installed.  The source code is pure Javascript.

### Test

Tests are authored in [Cypress].  Build, format, test, and check test coverage with `npm test`.  Use `npm run cypress-open` to run tests with the interactive Cypress test runner, or `npm run cypress-run` to run tests with the CLI.

### Version
**uinix-ui** will adhere to [semver] starting from 1.0.0.

### Contribute
There are currently no formal contribution guidelines.  [Issues] and [pull requests][pull-requests] are welcome!

### Backstory
Development for **uinix-ui** started formally around April 2021, shortly after publishing thoughts on a [whitepaper][ui-systems-and-complexity-whitepaper] exploring UI systems and complexity.  Informal development has always been a progressive iteration of ideas over the years following [@jxnblk]'s monumental works on [rebass], [styled-system] and [theme-ui].  Many great ideas in [theme-ui] form the foundation of **uinix-ui**.

When I encountered [@robinweser]'s beautiful plugin-based style system library [fela], I became excited that one could implement many features in [theme-ui] with [fela] using minimal code.  At this point, over the years, I had already formed strong opinions that most UI development can be built efficiently using just a small collection of component primitives that interoperate well with system specs: [`Element`](#elementprops), [`Icon`](#iconprops), [`Layout`](#layoutprops), and [`Text`](#textprops) (with `Element` implementing the other primitives).  I set out to implement these ideas and the initial work in React.

Stumbling on [@ai]'s 152-byte [nanostores] package (what is this sorcery 🤯) led to a pivotal moment to decouple **uinix-ui** from React, accomplished in [`2434023`][2434023].  While [nanostores] will be eventually removed in [`6415cfa`][6415cfa], it played an important role in transforming **uinix-ui** into a framework-agnostic implementation.

[@wooorm]'s inspirational and profilic works in [unified] and open-source continue to inspire how this library is authored.  Nothing is accidental, and everything is deliberate.  This includes:
- focusing more on standards and less on frameworks (e.g. **uinix-ui** is [ESM]-only, framework-agnostic, and [hyperscript]-based).
- understanding the *eventual* costs of coupling source code with types, and taking on the extra work to decouple and use [JSDoc]-based [Typescript] types.
- building a clear scope and goal for **uinix-ui**, and the uinix ecosystem.

**uinix-ui** is intended to be minimal, and do just a few things, but hopefully well, adhering to the [Unix philosophy][unix-philosophy] 🐧.  I see this project as being succcessful if it is able to remain small and update-free in the future.  I hope **uinix-ui**'s minimal API makes building and maintaing UI systems and UIs a simple and enjoyable experience.  We shall see how that goes.

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
[6415cfa]: https://github.com/uinix-js/uinix-ui/commit/6415cfae2234a5e51a9966ac137181ebdf1ec856

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
[jsdoc]: https://github.com/jsdoc/jsdoc
[mithril]: https://github.com/MithrilJS/mithril.js
[nanostores]: https://github.com/ai/nanostores
[preact]: https://github.com/preactjs/preact
[react]: https://github.com/facebook/react
[rebass]: https://rebassjs.org
[semver]: https://semver.org
[solid]: https://github.com/solidjs/solid
[styled-system]: https://github.com/styled-system/styled-system
[svelte]: https://github.com/sveltejs/svelte
[theme-ui]: https://github.com/system-ui/theme-ui
[typescript]: https://github.com/microsoft/TypeScript
[ui-systems-and-complexity-whitepaper]: https://uinix.dev/learn/ui-systems-and-complexity-whitepaper
[uinix-docs]: https://uinix.dev
[uinix-docs-uinix-ui]: https://uinix.dev/packages/uinix-ui
[uinix-docs-ui-systems]: https://uinix.dev/demos/systems
[uinix-js]: https://github.com/uinix-js
[uinix-fp]: https://github.com/uinix-js/uinix-fp
[uinix-theme]: https://github.com/uinix-js/uinix-theme
[unified]: https://github.com/unifiedjs/unified
[unix-philosophy]: https://en.wikipedia.org/wiki/Unix_philosophy
[vue]: https://github.com/vuejs/vue

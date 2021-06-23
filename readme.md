# uinix-ui

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

---

## Intro

**uinix-ui** is a minimal UI system to build UI systems.

It is [framework-agnostic](#frameworks) and can be used with any [hyperscript]-based view library (e.g. [React], [Preact], [Vue], [Mithril], [Solid], [htm], [Svelte]).  Its minimal [§ API](#api) of just four component primitives interoperates well with your [system knowledge](#system-knowledge) and specs.  It is unopinionated but configurable, providing simple and flexible ways to build and manage UI systems and UIs (see [§ Demos](#demos)).

Your system your rules 🤘.

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
    - [`createIcons([icons])`](#createiconsicons)
    - [`createTheme([theme])`](#createthemetheme)
    - [`createStyles([styles])`](#createstylesstyles)
    - [`createSystem([system])`](#createsystemsystem)
    - [`createConfig([config])`](#createconfigconfig)
    - [`load(h[, system, config])`](#loadh-system-config)
    - [`useIcon(icon)`](#useiconicon)
    - [`useTheme()`](#usetheme)
    - [`useStyles()`](#usestyles)
    - [`useVariant(variant)`](#usevariantvariant)
    - [`useSystem()`](#usesystem)
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
 * Specify breakpoints, global styles, style variants, and custom styles
 * that can be reused across your UIs.
 *
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

Load your `system` with the `load` method, and provide the following arguments
- [Required]: a `h` (i.e. `createElement`) function appropriate for your view library
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

```jsx
import {
  Element,
  Icon,
  Layout,
  Text,
} from 'uinix-ui';

/** Define custom theme-based styles */
const containerStyle = {
  maxWidth: 'width.container',
};

const baseStyle = {
  backgroundColor: 'background.primary',
  fontSize: 'm',
}

const PageLayout = ({children, title}) => {
  /** Layout provides a simple but powerful way to build layouts! */
  return (
    <Layout
      direction="column"
      spacing="m"
      styles={[baseStyle, containerStyle]}>
      {/* Compose styles easily in array-form using the styles prop */}
      {/* The `as` prop allows easy ways to render semantic HTML element */}
      <Layout
        as="header"
        justify="space-between"
        spacing="m">
        <Text as="h1">
          {title}
        </Text>
        {/* Shorthand props allows easy specification of theme-based styles */}
        <Icon color="brand.primary" icon="up" size="icon.m" />
      </Layout>
      <Layout
        as="main"
        flex="auto"
        direction="column">
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

After `load`ing your `system`, **uinix-ui** components are *system-aware* and have access to your `system` specs.  The following example outlines how system hooks can be used to retrieve values from the `system` when building custom components.

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
      styles={buttonStyle}
      onClick={onClick}>
      <Text variant="button.primary">{text}</Text>
    </Element>
  )
}
```

> **Note:** System hooks are framework-agnostic.  The [React] example above provides a usage pattern based on React hooks, but you can actually call system hooks anywhere in your code (outside of components) to access system values.  That's powerful!

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

> **Note:** [hyperscript] does not support SVG (see [#7](https://github.com/hyperhype/hyperscript/issues/7)) and the [`Icon`](#iconprops) component does not work in this demo.  You may wrap or use another hyperscript-based `h` function instead (e.g. [Mithril]'s `m` method is a good replacement).

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

> **Note:** The links above will be active once the presets are production-ready.

## Demos
View demos of UI systems that are reverse-engineered and built using **uinix-ui** with [this link][uinix-docs-ui-systems].

## Guides

View interactive guides on **uinix-ui** recipes and best practices with [this link][uinix-docs-uinix-ui].

## API

> **Note:** **uinix-ui** ships with [Typescript] declarations, compiled and emitted when installed.  The Javascript source code is documented in [JSDoc].  These supplement the documentation in this section with an exploratory API through code.

### System

#### `createIcons([icons])`

Creates and defines all SVG icons for the system.

##### `icons`
A map of icon names to its SVG string content.

You can retrieve the SVG string content of an icon using the [`useIcon`](#useiconicon) system hook.

<details>
<summary>Example</summary>

```js
import {createIcons} from 'uinix-ui';

const icons = createIcons({
  github:
    '<svg viewBox="0 0 16 16" width="24" height="24"><path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" fill="currentcolor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
  spinner:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="black"/><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor"><animateTransform xmlns="http://www.w3.org/2000/svg" attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></path></svg>',
});
```
</details>

<details>
<summary>Tips</summary>

- Setting the `fill` and `stroke` color to `'currentColor'` allows SVG icons to be color-customizable using the [`Icon`](#iconprops) component.
- You should make sure SVG icons have similar `viewBox`, `width`, `height` values, so they can be rendered consistently using the [`Icon`](#iconprops) component.
</details>

#### `createTheme([theme])`

Creates a `theme` object, supporting [creating theme-based styles](#createstylesstyles).

You can retrieve the `theme` object using the [`useTheme`](#usetheme) system hook.

##### `theme`

A partial `theme` object can be provided to `createTheme`, which will then create a [uinix-theme]-compliant `theme` object.  A brief overview of the `theme` object is provided below, but we strongly recommend reading the [uinix-theme] documentation for details on the comprehensive `theme` spec and behaviors.

- *Theme values* are organized under *theme properties* (e.g. `borders`, `colors`, `opacities`, `radii`, `spacings`, `animations`, `transforms`, `transitions`, `zIndices`).
- You can organize theme values under a theme property by arbitrarily nesting it.
- A theme value is resolved in **uinix-ui** components when specified by its *theme property key* for a relating CSS property name.  For example, if the `theme` organizes the theme property `colors` as follows,
  ```js
  const theme = createTheme({
    colors: {
      brand: {
        primary: '#0366d6',
      },
    },
  });
  ```
  then we can specify for the theme property key, an example value of `'brand.primary'`, and assign it to the relating color-aware CSS property to resolve the theme value to its underlying CSS style value.
  ```js
  const brandStyle = {
    color: 'brand.primary', // will resolve to '#0366d6',
  };
  ```
- The above works consistently for all theme properties and resolving theme values.

<details>
<summary>Example</summary>

```js
import {createTheme} from 'uinix-ui';

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
```
</details>

<details>
<summary>Tips</sumamry>

- The `theme ` is only responsible for defining the vocabulary of theme values.  It is *not* responsible for styling needs, which is the responsibility of [`styles`](#createstylesstyles).
- You have complete control on how you want to organize theme values.  Some prefer organization by nesting, while others prefer keeping the `theme` definitions flat with increased emphasis of naming theme keys appropriately.  The choice is left up to you.
- More examples and best practices are covered in the [Guides](#guides) section.
</details>

#### `createStyles([styles])`

#### `createSystem([system])`

Creates a valid `system` object that collates the `icons`, `styles`, `theme` specs.

You can retrieve the `system` object using the [`useSystem`](#usesystem) system hook.

##### `system`

A partial `system` can be provided to `createSystem`, which will create a valid `system` object by internally calling the [`createIcons`](#createiconsicons), [`createStyles`](#createstylesstyles), and [`createTheme`](#createthemetheme) utilities.

<details>
<summary>Example</summary>

```js
import {createStyles, createSystem, createTheme} from 'uinix-ui';

const theme = createTheme({...});
const styles = createStyles({...});

const system = createSystem({
  theme,
  styles,
});
```
</details>

<details>
<summary>Tips</summary>

- You can organize all creation of system specs in a `/system` folder/module, where you can better organize and create `icons`, `theme`, `styles`, and finally import and include them in a `createSystem` call.
</details>

#### `createConfig([config])`

#### `load(h[, system, config])`

#### `useIcon(icon)`

Retrieves the SVG content of the specified icon.

Can be called anywhere and requires a valid `system` to be [`load`ed](#loadh-system-config).

##### `icon`
The name of an icon assigned in `system.icons`.

<details>
<summary>Example</summary>

```js
import {useIcon} from 'uinix-ui';

const githubSvg = useIcon('github');

customSvgRenderer(githubSvg);
```
</details>

#### `useTheme()`

Retrieves the `theme`.

Can be called anywhere and requires a valid `system` to be [`load`ed](#loadh-system-config).

<details>
<summary>Example</summary>

```js
import {useTheme} from 'uinix-ui';

const theme = useTheme();

console.log(theme.colors.background.primary);
```
</details>

#### `useStyles()`

Retrieves the `styles`.

Can be called anywhere and requires a valid `system` to be [`load`ed](#loadh-system-config).

<details>
<summary>Example</summary>

```js
import {useStyles} from 'uinix-ui';

const styles = useStyles();

console.log(styles.interactive);
console.log(styles.variants.card.default);
```
</details>

#### `useVariant(variant)`

Retrieves the style definition for the specified variant.

Can be called anywhere and requires a valid `system` to be [`load`ed](#loadh-system-config).

##### `variant`

A `variant` is a string property path relative to `system.styles.variant`.  For example, the variant `card.primary` accesses the variant style defined in `system.styles.variant.card.primary`.

If an invalid `variant` is provided, `undefined` is returned by `useVariant`.

```js
const styles = {
  variants: {
    card: {
      primary: {
        borderRadius: 'm',
        boxShadow: 'm',
        padding: 'm',
      },
      }
    }
  }
}
```

<details>
<summary>Example</summary>

```js
import {useVariant} from 'uinix-ui';

const variantStyle = useVariant('card.default');

console.log(variantStyle);
```
</details>

#### `useSystem()`

Retrieves the entire `system`.

Can be called anywhere and requires a valid `system` to be [`load`ed](#loadh-system-config).

> **Note:** This hook is not particularly useful, but it is provided as a convenience to access the entire `system` if needed.

<details>
<summary>Example</summary>

```js
import {useSystem} from 'uinix-ui';

const system = useSystem();

console.log(system.icons);
console.log(system.styles);
console.log(system.theme);
```
</details>

### Components

#### `Element(props)`

#### `Icon(props)`

#### `Layout(props)`

#### `Text(props)`

### Utils

#### `merge(o1)(o2)`

[uinix-fp]'s deepmerge utility that merges two objects `o1` and `o2` without mutating the arguments.

This is provided as a convenient way to manage creating and merging `system` specs.

<details>
  <summary>Example</summary>

  ```js
  const o1 = {a: b: {c: 42}};
  const o2 = {a: b: {c: null, d: 42}};
  const merged = merge(o1)(o2);

  console.log(merged);
  ```
</details>

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

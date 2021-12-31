# uinix-ui

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

## Intro

**uinix-ui** is a minimal UI system to build UI systems.

It is [framework-agnostic](#frameworks) and plays nice with any [hyperscript]-based view library such as [React], [Preact], [Vue], [Mithril], [Solid], [htm], [Svelte].  It is setup-free: no transpiling, no Babel, no JSX pragma, and no peer dependencies are required.  Just plain old Javascript.

Its minimal [§ API](#api) of just four component primitives interoperates well with your [system knowledge](#system-knowledge) and system specs of `icons`, `theme`, and `styles`.  It is unopinionated but configurable, providing simple and flexible ways to build and manage UI systems and UIs (see [§ Demos](#demos)).

Your system your rules 🤘.

## Contents

- [Install](#install)
- [Quick Start](#quick-start)
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
- [Guides](#guides)
- [Demos](#demos)
- [API](#api)
  - [System](#system)
    - [`createIcons([icons])`](#createiconsicons)
    - [`createTheme([theme])`](#createthemetheme)
    - [`createStyles([styles])`](#createstylesstyles)
    - [`createSystem([system])`](#createsystemsystem)
    - [`createConfig([config])`](#createconfigconfig)
    - [`load(preset)`](#loadpreset)
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
  - [Utilities](#utilities)
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

## Quick Start

**uinix-ui** allows you to define and access system specs, and build system-constrained UI components with a minimal API.

```js
import {createElement as h} from 'react';
import {
  Element,
  Icon,
  Layout,
  Text,
  createSystem,
  load,
  useStyles,
} from 'uinix-ui';

const system = createSystem({
  icons: {
    github: '<svg>...</svg>',
  },
  styles: {
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 'width.container',
      padding: 'm',
    },
    typography: {
      global: {
        body: {
          fontSize: 'm'
        },
      },
      variants: {
        brand: {
          fontSize: 'l',
          fontWeight: 'bold',
        },
        nav: {
          link: {
            fontSize: 's',
            ':hover': {
              textDecoration: 'none',
            },
          },
        }
      },
    }
  },
  theme: {
    fontSizes: {
      s: '0.8rem',
      m: '1rem',
      l: '2rem',
    },
    sizes: {
      width: {
        container: '768px',
      },
    },
    spacings: {
      s: '1rem',
      m: '2rem',
      l: '4rem',
    },
  }
});

load({h, system});

const Header = () => {
  const styles = useStyles();

  return (
    <Layout
      as="header"
      align="center"
      justify="space-between"
      spacing="m"
      styles={styles.container}>
      <Layout align="center"spacing="m">
        <Text as="h1" variant="brand">
          MyBrand
        </Text>
      </Layout>
      <Element as="nav">
        <Layout wrap as="ul" spacing="m">
          <Text as="a" href="/about" variant="nav.link">
            About
          </Text>
          <Icon icon="github" size="icon.m" />
        </Layout>
      </Element>
    </Layout>
  );
}
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
import {createElement as h} from 'react';
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
    ({onClick}) => ({
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
  enableAtomicCss: false,
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
load({h, config, system});
```

Your `system` should be defined and loaded just once.  It should remain immutable after.

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
};

const PageLayout = ({children, title}) => {
  /** Layout provides a simple but powerful way to build layouts! */
  return (
    <Layout
      direction="column"
      spacing="m"
      styles={[baseStyle, containerStyle]}>
      {/* Organize and compose styles easily in array-form using the styles prop */}
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
  /** Retrieves and renders the specified icon as an svg element */
  const icon = useIcon('x');
  /** Retrieves system.styles */
  const styles = useStyles();
  /** Retrieves system */
  const system = useSystem();
  /** Retrieves system.theme */
  const theme = useTheme();
  /** Retrieves system.styles.variants[variant] */
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

> **Note:** This demo is not fully functional. I am unfamiliar and unable to pass Svelte component `slots` into **uinix-ui** components. Currently, all slots are rendered as siblings instead of children 😭.  Please help improve on this example if you are more familiar with the relevant Svelte best practices.

## Presets

Presets are shareable system configurations that you can simply [`load`](#loadpreset).

```js
import {load} from 'uinix-ui';
import themeUiPreset from 'uinix-ui-preset-theme-ui';

load(themeUiPreset);
```

- `uinix-ui-preset-theme-ui`
- `uinix-ui-preset-uinix`

> **Note:** The links above will be active once the presets are production-ready.

## Guides

This document is intended to be complete.  If you find it dense, and prefer another way to learn **uinix-ui**, visit the [official documentation][uinix-docs-uinix-ui] which provides interactive guides on recipes and best practices when building UIs with **uinix-ui**.

## Demos
Explore demos of UI systems that are reverse-engineered and built using **uinix-ui** with [this link][uinix-docs-ui-systems].

## API

**uinix-ui** ships with [Typescript] declarations, compiled and emitted when installed.  The Javascript source code is documented in [JSDoc].  These supplement the documentation in this section with an exploratory API through code.

### System

#### `createIcons([icons])`

Creates and defines all SVG icons for the system.

##### `icons`
A map of icon names to its SVG string content.  Icons can be arbitrarily nested for organization.

You can retrieve and render the specified icon as an SVG element using the [`useIcon`](#useiconicon) system hook.

<details>
<summary>Example</summary>

```js
import {createIcons} from 'uinix-ui';

const icons = createIcons({
  github:
    '<svg viewBox="0 0 16 16" width="24" height="24"><path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" fill="currentcolor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>',
  spinner: { // can be arbitrarily nested
    primary: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="black"/><path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor"><animateTransform xmlns="http://www.w3.org/2000/svg" attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></path></svg>'
  },
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
<summary>Tips</summary>

- The `theme` shares many features and ideas with [theme-ui].  It supports a few additional powerful theme properties, allowing you to implement `animations`, `keyframes`, `transforms`, `transitions`.
- The `theme` is only responsible for defining the vocabulary of theme values.  It is *not* responsible for styling needs, which is the responsibility of [`styles`](#createstylesstyles).
- You have complete control on how you want to organize theme values.  Some prefer organization by nesting, while others prefer keeping the `theme` definitions flat with increased emphasis of naming theme keys appropriately.  The decision is left to you.
- More examples and best practices are covered in the [Guides](#guides) section.

</details>

#### `createStyles([styles])`

Creates a `styles` object that can reference theme values when defining styles.

You can retrieve the `styles` object using the [`useStyles`](#usestyles) system hook.

##### `styles`

A partial `styles` can be provided to `createStyles`, which will then create a valid `styles` object.  A `styles` object has a typed interface that is explored in detail below.

There is a common way to define styles, which is detailed below:
- You can arbitrarily nest style definitions for organization.  For example:
  ```js
  const styles = {
    variants: {
      card: {
        primary: {
          large: {
            borderRadius: 'l',
            padding: 'l',
          },
        },
      },
    },
  };
  ```
- Styles must eventually resolve into a style object that contains CSS properties and either CSS values or theme values.  Pseudo-selectors/classes are supported.  For example:
  ```js
  const styles = {
    pill: {
      backgroundColor: 'brand.primary',
      '::after': {
        content: '"x"',
        marginLeft: 'm',
      },
      ':hover': {
        opacity: 'hover',
      },
    },
  },
  ```
- Style values can be specified in array-form, containing either CSS values or theme values.  These values will be responsively applied against the specified `styles.breakpoints`.  For example:
  ```js
  const styles = {
    breakpoints: ['468px', '768px'],
    responsiveContainer: {
      padding: ['s', 's', 'm'],
      maxWidth: ['100%', '100%', 'width.container']
    },
  };
  ```
- Unitless CSS values can be specified and they will be resolved accordingly.  For example, specifying `fontSize: 20` will resolve to `fontSize: '20px'`.
- Negative values, including negative theme values, can be specified and they will be resolved accordingly.  For example, specifying `padding: '-m'` will resolve to `padding: '-24px'` if `m` is assigned a value of `'24px'` in `system.theme.spacings`.

<details>
<summary>Example</summary>

```js
import {createStyles} from 'uinix-ui';

const styles = createStyles({
  // Define global styles for HTML elements and CSS classes
  global: {
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      fontFamily: 'body',
      fontSize: 'm',
    },
    // Convenient way to overwrite vendor classes with theme-based styles!
    '.tippy-content': {
      backgroundColor: 'background.inverse',
      color: 'text.inverse',
      margin: '-m', // Negative theme values work
      padding: ['xs', 'xs', 's'], // Responsive styles work
      fontSize: 'xs',
    },
  },
  // Organize typography styles, mirrors the parent styles interface
  typography: {
    // Define global styles for typographic HTML elements
    global: {
      h1: {
        fontSize: 'xl',
      },
    },
    // Typography variants are accessible by the Text component
    variants: {
      title: {
        color: 'text.primary',
        fontSize: 'l',
      },
    },
  },
  // Define and organize style variants, accessiblie by the `variant` prop in components
  variants: {
    card: {
      // can be arbitrarily nested for organization
      primary: {
        border: 'bordered',
        borderRadius: 'm',
        padding: ['s', 's', 'm'], // responsive-value supported
      },
    },
  },
  // Define any style objects or style functions on the styles object.
  pill: {
    backgroundColor: 'brand.primary',
    '::after': { // pseudo-selector
      content: '"x"',
      marginLeft: 'm',
    },
    ':hover': { // pseudo-class
      opacity: 'hover',
    },
  },
  disabled: ({disabled}) => ({
    opacity: disabled ? 'disabled' : undefined,
    pointerEvents: disabled ? 'none' : undefined,
  }),
});
```

</details>

##### `styles.breakpoints`

When specified, supports responsive styling.  `styles.breakpoints` should be specified as an array of strings, with its value being a valid CSS `width` value.  Responsive breakpoints will be evaluated as `min-width`-based media queries.

> **Note:** You still need to whitelist the responsive CSS properties in [`config.responsiveCssProperties`](#configresponsivecssproperties) to apply the specified responsive styles.

<details>
<summary>Example</summary>

Assuming the following `styles.breakpoints` and an example `responsiveCardStyle`,

```js
import {createStyles} from 'uinix-ui';

const styles = createStyles({
  breakpoints: ['468px', '768px'],
  responsiveCardStyle: {
    color: ['red', 'red', 'blue'],
    padding: ['s', 's', 'm'],
  },
});
```

The rendered style will look like:

```js
const resolvedResponsiveCardStyle = {
  color: 'red',
  padding: 's',
  "@media (min-width: 468px)": {
    color: 'red',
    padding: 's',
  },
  "@media (min-width: 768px)": {
    color: 'blue',
    padding: 'm',
  },
};
```

> **Note:** Remember to ensure that the corresponding responsive CSS property is whitelisted in `config.responsiveCssProperties` (e.g. `color`, `padding` for this example).

</details>

##### `styles.global`

Styles specified in `styles.global` will be applied to the global stylesheet.  This is useful for:
- CSS resets.
- Global styling for HTML elements with theme-based styles.
- Overriding vendor classnames with theme-based styles.

The keys for `styles.global` should be a CSS selector (e.g. HTML element names or CSS classnames), as how you would normally define them in a CSS stylesheet.  The values should be valid style objects.

<details>
<summary>Example</summary>

```js
import {createStyles} from 'uinix-ui';

const styles = createStyles({
  global: {
    // Common CSS reset to set boxSizing to border-box
    '*': {
      boxSizing: 'border-box',
    },
    // Set theme-based styles for HTML elements
    body: {
      color: 'text.primary',
      fontSize: 'm',
    },
    a: {
      color: 'text.link',
      textDecoration: 'none',
      // Pseudo-classes and common CSS-in-JS features are supported
      ':hover': {
        textDecoration: 'underline',
      }
    },
    // Override vendor classes with theme-based styles
    '.tippy-content': {
      backgroundColor: 'background.inverse',
      color: 'text.inverse',
      margin: '-m', // Negative theme values are supported
      padding: ['xs', 'xs', 's'], // Responsive styles are supported
      fontSize: 'xs',
    },
  },
});
```

</details>

##### `styles.variants`

Styles specified in `styles.variants` can be accessed with the [`useVariant`](#usevariantvariant) hook or with the [`variant` prop](#propsvariant) on **uinix-ui** components.  You can organize styles in `styles.variants` with appropriate nesting.

<details>
<summary>Example</summary>

```js
import {createStyles} from 'uinix-ui';

const styles = createStyles({
  variants: {
    button: {
      primary: {...},
      secondary: {...},
    },
    card: {
      primary: { // can be arbitrarily nested for organization
        border: 'bordered',
        borderRadius: 'm',
        padding: ['s', 's', 'm'], // responsive-value supported
      },
      secondary: {...},
    },
  },
});
```

</details>

##### `styles.typography`

`styles.typography` mirrors the structure of `styles` and provides a more explicit way to organize typography styles.  There are a number of differences in the structure, and the full structure is covered below:
- `styles.typography.fontFaces`: Specifies the font-faces as a structured object. The font-face name can be assignable in `theme.fontFamilies`.  The `src` file for a font-face can be either an absolute URL or a relative path.  If your JS build supports resolving font asset imports into relative paths, this can be used with `styles.typography.fontFaces`.
- `styles.typography.global`: Similar to `styles.global`, allows configuring typography styles for the global stylesheet.  Note that **uinix-ui** does not restrict how styles are specified in this object, but you should reserve them purely for typography styles (e.g. `fontSize`, `lineHeight`, `letterSpacing`, `color` etc).
- `styles.typography.variants`: Similar to `styles.variants`, allows organizing typography styles as variants.  The [`Text`](#textprops) component has direct access to these styles via the `variant` prop.  Note that these variant styles are not accessible by other **uinix-ui** components, so their specification is a purely explicit and semantic one to be used with the [`Text`](#textprops) component.
- `...styles.typography`:  You should not specify anything else on the `styles.typography` object.  Note that **uinix-ui** does not restrict you from doing this, but it's not particularly useful as there is no inteoperable way to retrieve them.

<details>
<summary>Example</summary>

```js
import {createStyles} from 'uinix-ui';

import robotoTtf from './fonts/roboto.ttf';

const styles = createStyles({
  typography: {
    // Define font faces and their source files
    fontFaces: {
      Roboto: {
        src: [robotoTtf],
      },
      Raleway: {
        src: 'https://absolute/url/to/font/asset.ttf',
      },
    },
    // Define global styles for HTML elements
    global: {
      h1: {
        fontSize: 'xl',
      },
    },
    // Typography variants are accessible by the Text component
    variants: {
      title: {
        color: 'text.primary',
        fontSize: 'l',
      },
    },
  },
});
```

</details>

##### `...styles`

Any other style defined directly on `styles` should be either a style object or style function.  These can be retrieved with the [`useStyles`](#usestyles) system hook and used in components.

<details>
<summary>Example</summary>

```js
import {createStyles} from 'uinix-ui';

const styles = createStyles({
  /** Reserved style keys and features */
  breakpoints: [...],
  typography: {...},
  variants: {...},
  /** Define all custom styles directly on other non-reserved keys */
  // Style object
  pill: {
    backgroundColor: 'brand.primary',
    '::after': { // pseudo-selector
      content: '"x"',
      marginLeft: 'm',
    },
    ':hover': { // pseudo-class
      opacity: 'hover',
    },
  },
  // Style function
  disabled: ({disabled}) => ({
    opacity: disabled ? 'disabled' : undefined,
    pointerEvents: disabled ? 'none' : undefined,
  }),
});
```

</details>

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

- You can organize system specs in a `system/` module, where you can create the relevant `icons`, `theme`, `styles` in separate submodules, and finally them in a `createSystem` call.

</details>

#### `createConfig([config])`

Creates a valid `config` object to configure the `system` and components.  Configurations are only applied when a `system` is [`load`ed](#loadpreset).

**uinix-ui** ships without configuration, but allows you to fully configure your system and rules based on your needs.

##### `config`

A partial `config` can be provided to `createConfig`, which will then create a valid `config` object.

<details>
<summary>Example</summary>

```js
import {createConfig} from 'uinix-ui';

createConfig({
  elementShorthandPropsMapping: {
    margin: ['m'],
  },
  responsiveCssProperties: [
    'margin-bottom',
    'margin-left',
    'margin-right',
    'margin-top',
  ],
});
```

</details>

##### `config.elementShorthandPropsMapping`

Configures the [`Element`](#elementprops) component with shorthand props that support theme-based styling.  This is convenient to support shorthand props that are theme-aware e.g. `color`, `bg`, `m`, `ml`, `mr`, `mb`, `mt`, `mx`, `my`.  The shorthand props is a feature popularized by [theme-ui], and is made fully customizable in **uinix-ui**.

`config.elementShorthandPropsMapping` is a mapping of CSS property names as keys, and an array of shorthand props for values.  Ordering of shorthand props in the array have decreasing precedence on how they are applied to the associated CSS property name.

<details>
<summary>Example</summary>

Configuring `config.elementShorthandPropsMapping` as follows,

```js
import {createConfig} from 'uinix-ui';

const config = createConfig({
  elementShorthandPropsMapping: {
    color: ['color'],
    backgroundColor: ['bg'],
    margin: ['m'],
    marginLeft: ['ml', 'mx', 'm'],
    marginBottom: ['mb', 'my', 'm'],
    marginRight: ['mr', 'mx', 'm'],
    marginTop: ['mt', 'my', 'm'],
  },
});
```

enables the [`Element`](#elementprops) component, and subsequently all **uinix-ui** components to be configured with the appropriate shorthand props.

```js
import {Layout} from 'uinix-ui';

const Example = () => {
  return (
    <Layout
      bg="background.primary"
      color="brand.primary"
      mx="auto"
      mb="l"
      my="s">
      Shorthand props are theme-aware.
      This renders with the following styles:
      - background-color (via bg prop): theme.colors.background.primary
      - color (via color prop): theme.colors.brand.primary
      - marginLeft (via mx prop): 'auto'
      - marginRight (via mx prop): 'auto'
      - marginTop (via my prop): theme.spacings.s
      - marginBottom (via mb prop which is higher precedence than my prop): theme.spacings.l
    </Layout>
  );
}
```

</details>

##### `config.elementStyles`

Configures the [`Element`](#elementprops) component with with specific props-based styles.  This is useful to apply shared consistent styles on all components composed with **uinix-ui**.

`config.elementStyles` is an array of style functions taking component props as arguments and returning style objects.

<details>
<summary>Example</summary>

Configuring `config.elementStyles` as follows,

```js
import {createConfig} from 'uinix-ui';

const config = createConfig({
  elementStyles: [
    ({onClick}) => {
      return {
        cursor: onClick ? 'pointer': undefined,
        ':hover': {
          opacity: onClick ? 'interactive': undefined,
        },
      };
    },
    ({disabled}) => {
      return {
        opacity: disabled ? 'disabled': undefined,
        pointerEvents: disabled ? 'none' : undefined,
      };
    },
  ],
});
```

enables the [`Element`](#elementprops) component, and subsequently all **uinix-ui** components to be configured with the appropriate props-based styles.

```js
import {Element, Layout} from 'uinix-ui';

const Example = () => {
  return (
    <Layout
      onClick={() => {
        console.log('will render with a cursor and hover opacity effect');
      }}>
      <Element
        disabled
        as="button"
        onClick={() => {
          console.log('will render with disabled opacity effect and be unclickable');
        }}>
        Click
      </Element>
    </Layout>
  );
}
```

</details>

##### `config.enableAtomicCss`

By default, `system` styles are rendered directly to CSS classnames.  If `config.enableAtomicCss` is set to `true`, styles will be rendered as atomic CSS.  This has benefits in reusing rendered CSS and may significantly improve performance on larger apps sharing many styles.  For more details on atomic CSS, please refer to the [fela] documentation.

<details>
<summary>Example</summary>

If we are rendering the following styles to CSS,

```js
const style1 = {
  backgroundColor: 'background.primary',
  color: 'brand.primary',
  padding: 'm',
};

const style2 = {
  color: 'brand.primary',
};
```

With `config.enableAtomicCss` set to `false`, the rendered CSS matches up with the defined styles and are applied as individual CSS classes on components e.g. `<Element className="a" />` and `<Element className="b" />`

```css
.a {
  background-color: #fff;
  color: #0366d6;
  padding: 1rem;
}

.b {
  color: #0366d6;
}
```

With `config.enableAtomicCss` set to `true`, the rendered CSS matches up with unique atomic units, and are applied as atomic CSS classes on components e.g. `<Element className="a b c" />` and `<Element className="b" />`

```css
.a {
  background-color: #fff;
}

.b {
  color: #0366d6;
}

.c {
  padding: 1rem;
}
```

</details>

##### `config.responsiveCssProperties`

By default, the `system` is not configured to be responsive.  With the appropriate responsive breakpoints and styles defined in [`createStyles`](#createstylesstyles), the `system` will be responsive on the CSS property names specified in `config.responsiveCssProperties`.

<details>
<summary>Example</summary>

Configuring `config.responsiveCssProperties` as follows,

```js
import {createConfig} from 'uinix-ui';

const config = createConfig({
  responsiveCssProperties: [
    'color',
    'margin',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'margin-top',
  ],
});
```

Allows the following styles to be responsive,

```js
const styles = {
  breakpoints: ['480px', '768px'],
  style1: {
    color: ['red', 'green', 'blue'], // responsive (whitelisted)
    margin: ['s', 's', 'l'], // responsive (whitelisted)
  },
  style2: {
    color: ['red', 'green', 'blue'], // responsive (whitelisted)
    padding: ['s', 's', 'l'], // not responsive (you should explicitly whitelist in config.responsiveCssProperties)
  },
};

```

</details>

<details>
<summary>Tips</summary>

- While it may be inconvenient that the `system` requires explicit whitelisting of responsive CSS properties, this should be a simple configuration that is specified once and remains unchanged.  **uinix-ui** ships without configuration and is unopinionated on this, letting you control the behaviors explicitly.

</details>

#### `load(preset)`

To use **uinix-components**, a valid `system` needs to be loaded with an appropriate `h` function, and with an optional `config`.

> **Note:** You should `load` your `system` once in an appropriate entry point in your app, and it should remain immutable after.

<details>
<summary>Example</summary>

```js
import {createElement as h} from 'react';
import {createConfig, createSystem, load} from 'uinix-ui';

const system = createSystem({...});
const config = createConfig({...});

// load the system once in an entry point in your app.
load({h, config, system});

const App = () => {
  return ...
};
```

</details>

##### `preset.h`

`h` is a common alias for the `createElement` method.  It is popularized by [hyperscript], and many UI frameworks support this API for creating elements.  See [§ Frameworks](#frameworks) for examples on using `h` with `load`.

A list of `h`-equivalent methods in popular frameworks are provided below for convenience:
- [React][]: `React.createElement`
- [Preact][]: `Preact.h`
- [Vue][]: `Vue.h`
- [Mithril][]: `Mithril.m`
- [hyperscript][]: `h`

##### `preset.system`

A valid `system` created by [`createSystem`](#createsystemsystem).

##### `preset.config`

A valid `config` created by [`createConfig`](#createconfigconfig).


#### `useIcon(icon)`

Retrieves and renders an SVG element based on the specified `icon` from `system.icons`.

Can be called anywhere and requires a valid `system` to be [`load`ed](#loadpreset).

##### `icon`
The name of an icon or a valid icon property path assigned in `system.icons`.

<details>
<summary>Example</summary>

```js
import {useIcon} from 'uinix-ui';

const Example = () => {
  const BrandPrimarySvg = useIcon('brand.primary');
  return <BrandPrimarySvg />;
}
```

</details>

#### `useTheme()`

Retrieves the system `theme`.

Can be called anywhere and requires a valid `system` to be [`load`ed](#loadpreset).

<details>
<summary>Example</summary>

```js
import {useTheme} from 'uinix-ui';

const theme = useTheme();

console.log(theme.colors.background.primary);
```

</details>

#### `useStyles()`

Retrieves the system `styles`.

Can be called anywhere and requires a valid `system` to be [`load`ed](#loadpreset).

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

Retrieves the variant style for the specified variant from the system.

Can be called anywhere and requires a valid `system` to be [`load`ed](#loadpreset).

##### `variant`

A `variant` is a string property path relative to `system.styles.variant`.  For example, the variant `'card.primary'` accesses the variant style defined in `system.styles.variant.card.primary`.

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

If an invalid `variant` is provided, `undefined` is returned by `useVariant`.

<details>
<summary>Example</summary>

```js
import {useVariant} from 'uinix-ui';

const variantStyle = useVariant('card.default');
const undefinedVariantStyle = useVariant('does.not.exist');

console.log(variantStyle);
console.log(undefinedVariantStyle);
```

</details>

#### `useSystem()`

Retrieves the entire `system`.

Can be called anywhere and requires a valid `system` to be [`load`ed](#loadpreset).

> **Note:** This hook is not particularly useful, but it is provided as a convenience to access the entire `system` if required.

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

The `Element` component is the elementary building block in **uinix-ui**.  It benefits from `system` [configuration](#createconfigconfig).  Composing components with `Element` passes on all shared configuration and behaviors.

> **Note:** `Element` implements the other **uinix-ui** components ([`Layout`](#layoutprops), [`Icon`](#iconprops), [`Text`](#textprops)).  The `Element` component is also more commonly known as the `Box` component in many other UI system libraries.  We name it as `Element` to emphasize its primitive and non-unique nature, just as the `HTMLElement`, which can be extended to create more complex UI elements.

##### `props`

`Element` has an extremely small API.  It functions essentially as a passthrough for the `HTMLElement`, with just a small set of additional props detailed below.

##### `props.as`
Sets `Element` to render as the specified HTML element or custom element.  Renders as a `HTMDivElement` by default.

<details>
<summary>Example</summary>

Render `Element` as an `a` element with appropriate props:
```js
import {Element} from 'uinix-ui';

const Example = () => {
  return (
    <Element as="a" href="https://github.com/uinix-js/uinix-ui">
      uinix-ui
    </Element>
  );
};
```

You can also render `Element` using a custom element and pass through props.

> **Note:** that if you would like to benefit from themed styles, the custom element should be at least wrapped with an appropriate **uinix-ui** component accepting `styles` and `styleProps`.

```js
import {Link} from 'react-router';

const CustomLink = ({children, to, ...rest}) => {
  return (
    <Element {...rest}>
      <Link to={to}>
        {children}
      </Link>
    </Element>
  );
};

const Example = () => {
  return (
    <Element as={Link} styles={...} to="/">
      uinix-ui
    </Element>
  );
};
```

</details>

##### `props.styles`
You can style an `Element` as you would for a `HTMLElement` using the `className` and `style` props.  The `styles` prop provides a way to apply theme-based styles.  It also provides a convenient way to compose and merge multiple styles by simply specifying them in array-form.  `styles` supports popular CSS-in-JS features such as pseudo-selectors/classes, nested expressions, responsive values.

`styles` can be specified as either style objects or style functions (see [`props.styleProps`](#propsstyleprops)).

<details>
<summary>Example</summary>

```js
import {createElement as h} from 'react';
import {
  Element,
  createSystem,
  load,
  useStyles,
} from 'uinix-ui';

const system = createSystem({
  theme: {
    borders: {
      bordered: '1px solid #eee',
    },
    colors: {
      brand: {
        primary: 'blue',
      },
    },
    radii: {
      m: '4px',
    },
    spacings: {
      s: '0.5rem',
      m: '1rem',
      l: '2rem',
    },
  },
  styles: {
    breakpoints: ['468px', '768px'],
    card: {
      border: 'bordered',
      borderRadius: 'm',
      padding: 'm',
    },
  },
});

load({h, system});

const Example = () => {
  const styles = useStyles();

  const style = {
    color: '#ff0000', // non-theme value
    padding: ['s', 's', 'l'], // responsive theme values
    ':hover': { // hover pseudo class
      color: 'brand.primary', // theme value
    },
  };

  return (
    <>
      <Element styles={style}>
        Styling with a single style object
      </Element>
      <Element styles={[style, styles.card]}>
        Styling with multiple merged styles (system styles can be merged too!)
      </Element>
    </>
  );
};
```

</details>

##### `props.variant`

When specified, accesses a variant style specified in `system.styles.variants`.

A `variant` is a string property path relative to `system.styles.variant`.  For example, the variant `'card.primary'` accesses the variant style defined in `system.styles.variant.card.primary`.  If a `variant` is invalid, the style is not applied.


<details>
<summary>Example</summary>

```js
import {createElement as h} from 'react';
import {
  Element,
  createSystem,
  load,
} from 'uinix-ui';

const system = createSystem({
  theme: {
    borders: {
      bordered: '1px solid #eee',
    },
    radii: {
      m: '4px',
    },
    spacings: {
      s: '0.5rem',
      m: '1rem',
      l: '2rem',
    },
  },
  styles: {
    variants: {
      card: {
        primary: {
          border: 'bordered',
          borderRadius: 'm',
          padding: 'm',
        },
      },
    },
  };
});

load({h, system});

const Example = () => {
  return (
    <Element variant="card.primary">
      Will render the card.primary variant style with:
      border=1px solid #eee, borderRadius=4px, padding=1rem
    </Element>
  );
};
```

</details>

##### `props.styleProps`

`styleProps` provides the data used by style functions defined in [`props.styles`](#propsstyles).  A style function is a function that takes `styleProps` and returns a style object.

<details>
<summary>Example</summary>

```js
import {createElement as h} from 'react';
import {
  Element,
  createSystem,
  load,
  useStyles,
} from 'uinix-ui';

const system = createSystem({
  theme: {
    colors: {
      tones: {
        danger: '#ee0000',
        success: '#00ee00',
      },
    },
    opacities: {
      invisible: '0',
      disabled: '0.3',
      visible: '1',
    },
    spacings: {
      m: '1rem',
      l: '2rem',
    },
  },
  styles: {
    disabled: ({disabled}) => ({
      opacity: disabled ? 'disabled' : undefined,
      pointerEvents: disabled ? 'none' : undefined,
    }),
  },
});

load({h, system});

const Example = () => {
  const styles = useStyles();

  const privateStyle = ({status, size}) => {
    return {
      color: `tones.${status}`,
      padding: size === 'l' ? 'l' : 'm',
    };
  };

  return (
    <>
      <Element
        styles={privateStyle}
        styleProps={{
          status: 'danger',
          size: 'l',
        }}>
        Will render with: color=#ee0000, padding=2rem
      </Element>
      <Element
        styles={privateStyle}
        styleProps={{
          status: 'sucecss',
          size: 'm',
        }}>
        Will render with: color=#00ee00, padding=1rem
      </Element>
      <Element
        styles={[privateStyle, styles.disabled]}
        styleProps={{
          disabled: true,
          status: 'danger',
        }}>
        Styling with multiple merged styles (system styles can be merged too!)
        Will render with: color=#ee0000, padding=m, opacity=0.3, pointerEvents=none
      </Element>
    </>
  );
};
```

</details>

##### `...props`

`Element` passes through all other props onto the eventual `HTMLElement`.

If shorthand props are configured in [`config.elementShorthandPropsMapping`](#configelementshorthandpropsmapping), the prop values are applied as styles.

If custom element styles are configured in [`config.elementStyles`](#configelementstyles), the relating prop values are used by the element style functions to evaluate conditional styles.

#### `Icon(props)`

The `Icon` component interoperates with the `system.icons` spec.

It provides an easy way to render icons in the system.

<details>
<summary>Example</summary>

```js
import {createElement as h} from 'react';
import {
  Icon,
  createSystem,
  load,
} from 'uinix-ui';

load({
  h,
  system: createSystem({
    icons: {
      brand: {
        logo: '<svg>...<svg/>',
      }
    },
    theme: {
      colors: {
        brand: {
          primary: 'red',
        },
      },
      sizes: {
        icon: {
          m: '16px',
        },
      },
    },
  }),
});

const customStyles = [
  {
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
];

const Example = () => {
  return (
    <Icon
      color="brand.primary" {/* theme.colors-aware */}
      icon="brand.logo" {/* icon from the system */}
      size="icon.m" {/* theme.sizes-aware */}
      styles={customStyles} {/* supports Element.styles prop */}
      onClick={() => console.log('clicked')}
    />
  );
};
```

</details>

##### `props.icon`
When specified, will retrieve and render the specified icon in the system as a `HTMLSVGElement`.  If the icon does not exist in the system, `null` is rendered.

##### `props.color`
Sets the icon SVG container's `color`.  You can use a theme-based value.

An icon will apply the specified color if its source SVG content uses `'currentColor'` for appropriate color attributes (e.g. `stroke`, `fill`).

##### `props.height`
Sets the icon SVG's `height`.  You can use a theme-based value.

##### `props.size`
Sets the icon SVG's `height` and `width`. You can use a theme-based value.

Use this to conveniently set equal height and width for the icon.  Use `props.height` or `props.width` to set non-equal dimensions for the SVG.

##### `props.width`
Sets the icon SVG's `width`.  You can use a theme-based value.

##### `...props`
`Icon` is composed from [`Element`](#elementprops), and therefore supports the `as`, `styles`, `styleProps`, `variant`, and shorthand props.

`Icon` renders `as` a `HTMLDivElement` by default, and will render `as` a semantic `HTMLButtonElement` if `props.onClick` is provided.

`Icon` passes through all other props onto the eventual `HTMLElement`.

`Icon` always ignores `props.children` and `props.as`.

#### `Layout(props)`

The `Layout` component interoperates with the `system.theme.spacings` spec.

It provides an easy way to rapidly build flexbox-based layouts to consistently space child elements based on theme values defined in `system.theme.spacings`.  It also provides convenient flexbox props to configure common UI layouts.

<details>
<summary>Example</summary>

```js
import {createElement as h} from 'react';
import {
  Layout,
  createSystem,
  load,
} from 'uinix-ui';

const system = createSystem({
  theme: {
    sizes: {
      width: {
        container: '768px',
      },
    },
    spacings: {
      s: '0.8rem',
      m: '1rem',
      l: '2rem',
      xl: '3rem',
    },
  },
  styles: {
    layout: {
      height: '100vh',
      margin: '0 auto',
      paddingLeft: 'l',
      paddingRight: 'l',
      width: 'width.container',
    },
  },
});

load({h, system});

const Example = () => {
  const styles = useStyles(); {/* Can use system hooks */}

  return (
    <Layout
      direction="column" {/* CSS flexDirection property */}
      spacing="xl" {/* Spaces child nodes (i.e. header, main, footer) evenly */}
      styles={styles.layout}> {/* Can use the Element stylels prop */}
      <Layout
        as="header" {/* Render as a semantic HTML element */}
        align="center" {/* CSS alignItems property */}
        justify="space-between" {/* CSS justifyContent property */}
        spacing="m">
        <h1>Logo (left)</h1>
        <a href="/login">
          Login (right)
        </a>
      </Layout>
      <Layout
        as="main"
        flex="auto"
        direction="column"
        spacing="l">
        Easily build UI layouts with Layout!
      </Layout>
      <Layout
        as="footer"
        align="center"
        justify="space-between">
        <div>
          Copyright (left)
        </div>
        <a href="https://github.com/uinix-js">
          Github (right)
        </a>
      </Layout>
    </Layout>
  );
}
```

</details>

##### `props.direction`
Sets the `flexDirection` CSS property.

##### `props.inline`
If `true`, sets the `display` CSS property to `'inline-flex'`, otherwise sets to `'flex'` by default.

##### `props.spacing`
Spaces all children (except the last child) evenly by the specified margin value.  You can use a theme-based value.

Spacing is applied as `margin-right` by default and `margin-bottom` if the `props.direction` property is set to `'column'`.

##### `props.wrap`
If `true`, sets the `flexWrap` CSS property to `'wrap'`, otherwise it is undefined by default.

##### `props.wrapSpacing`
If `props.wrap` is set to `true`, you may space all wrapped children with the specified vertical margin value.  A negative margin is applied on the `Layout` element.  You can use a theme-based value.

##### `props.align`
Sets the `alignItems` CSS property.

##### `props.alignSelf`
Sets the `alignSelf` CSS property.

##### `props.flex`
Sets the `flex` CSS property.

##### `props.justify`
Sets the `justifyContent` CSS property.

##### `props.justifySelf`
Sets the `justifySelf` CSS property.

##### `...props`
`Layout` is composed from [`Element`](#elementprops), and therefore supports the `as`, `styles`, `styleProps`, `variant`, and shorthand props.

`Layout` passes through all other props onto the eventual `HTMLElement`.

#### `Text(props)`

The `Text` component interoperates with the `system.styles.typography` spec.

It provides an easy way to render and apply text styles defined by the system's typography rules, and convenient typography props to further configure text styles.  Whenever possible, we recommend organizing text styles in `system.styles.typography`.

<details>
<summary>Example</summary>

```js
import {createElement as h} from 'react';
import {
  Text,
  createSystem,
  load,
} from 'uinix-ui';

load({
  h,
  system: createSystem({
    theme: {
      fontFamilies: {
        body: 'arial',
        heading: 'impact',
      },
      fontSizes: {
        's': '0.7rem',
        'm': '1rem',
        'l': '2rem',
      },
      lineHeights: {
        body: '20px',
        heading: '40px',
      },
    },
    styles: {
      typography: {
        variants: {
          title: {
            fontFamily: 'heading',
            fontSize: 'l',
            fontWeight: 'bold',
            lineHeight: 'heading',
          },
        }
      },
    },
  }),
});

const customStyles = [
  {
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
];

const Example = () => {
  return (
    <Text
      as="h1" {/* convenient way to render semantic HTML elements */}
      fontFamily="courier" {/* specify fontFamily CSS property */}
      styles={customStyles} {/* supports Element.styles prop */}
      textAlign="center" {/* specify textAlign CSS property */}
      variant="title" {/* reference a defined typography variant style */}
      whiteSpace="pre"> {/* specify whiteSpace CSS property */}
      Text Element
    </Text>
  );
};
```

</details>

##### `props.fontFamily`
Sets the `fontFamily` CSS property.  You can use a theme-based value.

##### `props.fontSize`
Sets the `fontSize` CSS property.  You can use a theme-based value.

##### `props.fontStyle`
Sets the `fontStyle` CSS property.

##### `props.fontVariant`
Sets the `fontVariant` CSS property.

##### `props.fontWeight`
Sets the `fontWeight` CSS property.  You can use a theme-based value.

##### `props.letterSpacing`
Sets the `letterSpacing` CSS property.  You can use a theme-based value.

##### `props.lineHeight`
Sets the `lineHeight` CSS property.  You can use a theme-based value.

##### `props.textAlign`
Sets the `textAlign` CSS property.

##### `props.textDecoration`
Sets the `textDecoration` CSS property.

##### `props.textOverflow`
Sets the `textOverflow` CSS property.

##### `props.textShadow`
Sets the `textShadow` CSS property.  You can use a theme-based value.

##### `props.textTransform`
Sets the `textTransform` CSS property.

##### `props.whiteSpace`
Sets the `whiteSpace` CSS property.

##### `props.wordBreak`
Sets the `wordBreak` CSS property.

##### `props.wordSpacing`
Sets the `wordSpacing` CSS property.  You can use a theme-based value.

##### `...props`
`Text` is composed from [`Element`](#elementprops), and therefore supports the `as`, `styles`, `styleProps`, `variant`, and shorthand props.

`Text` renders `as` a `HTMLSpanElement` by default.

`Text` passes through all other props onto the eventual `HTMLElement`.

`Text` renders variant styles by accessing from `system.styles.typography.variants` as opposed to `system.styles.variants` in other **uinix-ui** components.

### Utilities

#### `merge(o1)(o2)`

[uinix-fp]'s deepmerge utility that merges two objects `o1` and `o2` without mutating the arguments.  Re-exported as a convenient way to manage creating and merging `system` specs.

<details>
  <summary>Example</summary>

  ```js
  import {merge} from 'uinix-ui';

  const o1 = {a: b: {c: 42}};
  const o2 = {a: b: {c: null, d: 42}};
  const merged = merge(o1)(o2);

  console.log(merged);
  ```

</details>

## System Knowledge

System knowledge refers to our knowledge and understanding of systems. As software systems grow, complexity inevitably grows with the independent ways components in a system can interact with each other.  Our understanding of systems is directly related to our knowledge of these interactions.

It is common practice to abstract and flatten shareable code for reuse, to decrease system complexity.  However, this is not always true because wrong abstractions and indirections may actually increase complexity in a system.

**uinix-ui** provides a way for system specs to be defined in a centralized `system` object, and provides ways for interoperable components to interface with it.  This improves our system knowledge by allowing the `system` source of truth to be easily accessible.  While this is helpful in managing complexity in UI systems to some degree, we continue to advice implementors that complexity will continue to grow with decisions that are made outside of **uinix-ui** (e.g. when building custom components).

In **uinix-ui**, the decisions and designs of the system can be captured and applied in different ways, as illustrated in the following example on how we can achieve the same styling goals for a custom component with different approaches.

```js
import {createElement as h} from 'react';
import {createSystem, load, useStyles} from 'uinix-ui';

// a.js
load({
  h,
  system: createSystem({
    styles: {
      card: {
        borderRadius: 'm',
        boxShadow: 'm',
        padding: 'm',
      },
    },
  }),
});

const Component = ({children}) => {
  const styles = useStyles();
  return <Element styles={styles.card}>{children}</Element>
}

// b.js
load({
  h,
  system: createSystem({
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
});

const Component = ({children}) => {
  return <Element variant="card">{children}</Element>
}

// c.js
load({h});

const Component = ({children}) => {
  const cardStyle = {
    borderRadius: 'm',
    boxShadow: 'm',
    padding: 'm',
  };
  return <Element styles={cardStyle}>{children}</Element>
}
```

All three approaches arrive to the same styling goals, but the system knowledge is managed differently in each approach:
- In `a.js`, we made a decision to track the card style formally in `system.styles`.  The style can then be retrieved with the `useStyles` API.  Although this is sourcing styles from the system, implementors may override with additional style properties in consuming code, leading to untracked complexity living outside of the `system`.
- In `b.js`, we made a decision to track the card style as a style variant in `system.styles.variants`.  When accessed through the `variant` prop in **uinix-ui** components, this indicates an explicit application of styles that cannot be overriden since this is a private implementation of styles by **uinix-ui** components.
- In `c.js`, we made a decision *not* to define the card style in the `system`, and to define it in the consuming component.  This decision may make sense if the goal is to keep the styling details as a private implementation in `Component`, instead of capturing it in the `system`.

It is important to note that we cannot state which is the best approach.  That "best" approach depends on the goals of the system and how it will be used.  **uinix-ui** is unopinionated on how you organize your `system`, but it provides a minimal API to help you easily define, manage, and access your `system`.  With easy access to the `system`, you can surface and visualize your system with [meaningful renderers][uinix-docs-ui-systems], thus improving system knowledge by making it easy to inspect the design decisions made in the system.

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
- focusing more on standards and less on frameworks (e.g. **uinix-ui** is JS-only, [ESM]-only, and framework-agnostic).
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

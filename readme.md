import {prop} from 'uinix-fp';
import Readme from 'uinix-ui/readme.md';

# uinix-ui

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

A minimal framework-agnostic UI system to build UI systems.

Your system, your rules 🤘.

---

## Intro

**uinix-ui** is a UI system to build UI systems, and follows a few principles:

- It is framework-agnostic but framework-friendly 🤗.  It supports [React], [Preact], [Vue], and, in general, any [Hyperscript]-based style of creating elements.
- It is a minimal UI system that ships with just four components (`Element`, `Icon`, `Layout`, `Text`) that interoperate and compose well with system APIs (`theme`, `icons`, `styles`).
- It is unopinionated but highly configurable.
- It intends to stay minimal and simple, and do just a few things well, adhering to the [Unix philosophy][unix-philosophy] 🐧.
- It supports maximizing the [system knowledge](system-knowledge) 📖 of your UI system.

These principles allow you to configure and build UI systems without deep knowledge and commitment to **uinix-ui**.

## Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
  - [Components](#components)
  - [System](#system)
  - [Utils](#utils)
- [System Knowledge](#system-knowledge)
- [Guides](#guides)
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

> **uinix-ui** is in active development.  A formal NPM package will be released in the near future.  Please install from the Github repo for now.

```sh
npm install github:uinix-js/uninix-ui
```

## Usage

## API

### Components

### System

### Utils

## System Knowledge

## Guides

A collection of interactive [guides][uinix-docs-uinix-ui] on recipes and best practices can be found in the progressive progressive [uinix-docs] website!

You can also view demos of [UI systems][uinix-docs-ui-systems] reverse-engineered and built rapidly with **uinix-ui**.

## Related
- [uinix-js]: The uinix ecosystem promoting Unix-like UI development.
- [uinix-docs]: Progressive docs for the uinix ecosystem.
- [uinix-fp]: FP utilities for authoring common JS utilities in functional form.
- [uinix-theme]: uinix theme spec and utilties
- [UI Systems and Complexity Whitepaper][ui-systems-and-complexity-whitepaper]: Whitepaper on system knowledge and managing complexity in UI systems.

## Project

### Comparison

There are tons of UI and design systems.  Notable ones are listed below:
- Bootstrap
- Ant Design
- Material UI
- Semantic UI
- Theme UI

The main differences of **uinix-ui** are based on the following:
- It is designed as a UI system  to build UI systems, and not as a library to enforce specific design/UI patterns.  This is evident in the fact that the library is unstyled (and ugly 😭) by default!
- It is framework-agnostic so you can use it with any [hyperscript]-based API.  Popular frameworks such as [React], [Preact], and [Vue] all play nice with it 👍.
- It is a minimal UI system, and therefore its API exposes only the neccessary primitives.  It is definitely a *batteries-excluded* ❌ 🔋 library.
- It is generally unopinionated about how you use it.  You can achieve the same outcome in many ways with **uinix-ui**.  There is a [Guides](#guides) section that provides best practices and recipes, but the library itself does not impose anything on you.  As mentioned earlier: *Your system, your rules 🤘.*

While the ecosystem of UI system libraries solve for different problems and needs, **uinix-ui** provides something lacking in the ecosystem,

> A minimal framework-agnostic UI system to build UI systems.

If you are looking to build custom UI systems from scratch, without the need to wrap (often awkwardly) around opinionated design systems, and want full control on the specification of your [system knowledge](#system-knowledge), then **uinix-ui** provides this conveniently for you!


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

Informal development has always been a progression of my personal inspirations by [@jxnblk]'s monumental work and iterations on [rebass], [styled-system] and [theme-ui] over the years.  The key ideas in [theme-ui] form the main foundations of **uinix-ui**.

It is not until an encounter with [@robinweser]'s beautiful ecosystem of style plugins in [fela], that I became extremely excited that one could implement a minimal version of [theme-ui] with minimal code.  The [React] POC was implemented up until [`2434023`][2434023], and was starting to look good.

Stumbling on [@ai]'s 152byte [nanostores] (what is this sorcery 🦹!) led to a pivotal attempt to decouple **uinix-ui** from React, accomplished in [`2434023`][2434023], and therefore making **uinix-ui** a framework-agnostic and [hyperscript]-based library.

[@wooorm]'s profilic and polished works in [unified] and open-source provided guidance on both the philosophy and approach on how this library was written.  Nothing is accidental, and everything is deliberate.  This includes:
- Focusing on ESM.
- Intentionally decoupling source code from [Typescript].
- Being thoughtful on the scope and goals of the ecosystem.

**uinix-ui** is one of many libraries that I intend to continue building and maintaining, as I continue to embark on the journey on finding and understanding simplicity in (UI) things.  Be on the lookout for libraries such as uinix-form, uinix-search, and more!

### License
[MIT][license] © [Chris Zhou][@chrisrzhou]


<!-- project -->
[build]: https://github.com/uinix-js/uinix-ui/actions
[build-badge]: https://github.com/uinix-js/uinix-ui/workflows/main/badge.svg
[bundle-size]: https://bundlephobia.com/result?p=uinix-ui
[bundle-size-badge]: https://img.shields.io/bundlephobia/minzip/uinix-ui.svg
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

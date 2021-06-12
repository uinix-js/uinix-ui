# uinix-ui

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]

A minimal UI system to build UI systems.

---

## Intro

## TODOs

- [ ] add tests for `system/config/h.js`
- [ ] update JSDoc-based types
- [ ] update readme and APIs

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

`uinix-ui` is an [ESM][] module requiring Node 12+.

```sh
npm install github:uinix-js/uninix-ui
```

> `uinix-ui` is in active development.  A formal NPM package will be released in the near future.  Please install from the Github repo for now.


## Known Issues
- Specifying an invalid `typography.fontFaces` source file hangs the Fela `renderer.renderFont` call
- Code coverage for `@cypress/code-coverage` via `babel-plugin-istanbul` is not writing anything to `.nyc_output/out.json`.

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
[demos]: https://systems.uinix.dev
[esm]: https://nodejs.org/api/esm.html
[fela]: https://github.com/robinweser/fela
[react]: https://github.com/facebook/react
[rebass]: https://github.com/rebassjs/rebass
[theme-ui]: https://github.com/system-ui/theme-ui
[uinix]: https://github.com/uinix-js
[uinix-theme]: https://github.com/uinix-js/uinix-theme
[uinix-ui-preset-simple]: https://github.com/uinix-js/uinix-ui-preset-simple
[uinix-ui-systems]: https://github.com/uinix-js/uinix-ui-systems
[uinix-ui-system-simple]: https://github.com/uinix-js/uinix-ui-system-simple
[unix-philosophy]: https://en.wikipedia.org/wiki/Unix_philosophy

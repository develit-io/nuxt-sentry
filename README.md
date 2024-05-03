# Nuxt Sentry

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt 3 module for Sentry.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/@binaryoverload/nuxt-sentry?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- ⛰ &nbsp;Foo
- 🚠 &nbsp;Bar
- 🌲 &nbsp;Baz

## Quick Setup

1. Add `@binaryoverload/nuxt-sentry` dependency to your project

```bash
# Using pnpm
pnpm add -D @binaryoverload/nuxt-sentry

# Using yarn
yarn add --dev @binaryoverload/nuxt-sentry

# Using npm
npm install --save-dev @binaryoverload/nuxt-sentry
```

2. Add `@binaryoverload/nuxt-sentry` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['@binaryoverload/nuxt-sentry'],
})
```

That's it! You can now use Nuxt Sentry in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@binaryoverload/nuxt-sentry/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@binaryoverload/nuxt-sentry
[npm-downloads-src]: https://img.shields.io/npm/dm/@binaryoverload/nuxt-sentry.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@binaryoverload/nuxt-sentry
[license-src]: https://img.shields.io/npm/l/@binaryoverload/nuxt-sentry.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@binaryoverload/nuxt-sentry
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com

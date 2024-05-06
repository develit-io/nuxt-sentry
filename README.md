# Nuxt Sentry

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt 3 module for Sentry.

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
  runtimeConfig: {
    public: {
      sentry: {
        dsn: 'YOUR_DSN',
      },
    },
  },
})
```

That's it! You can now use Nuxt Sentry in your Nuxt app ✨

## Configuration

The module can be configured by providing a `sentry` key in the `public` section of the `runtimeConfig` or `appConfig` in `nuxt.config.ts`.

The `sdk` object is passed directly to the Sentry SDK. It consists of the properties specified in the [Sentry documentation here](https://docs.sentry.io/platforms/javascript/configuration/options/).

The `integration` object contains the properties specified in the [Sentry documentation here](https://docs.sentry.io/platforms/javascript/configuration/integrations/). For each integration, you can either pass `true` to enable it or an object to configure it. By default, the following integrations are enabled:
- `BrowserTracing` (With the Vue integration enabled)
- `Replay`

Runtime config:

```ts
sentry: {
  enabled?: boolean // Default: Enabled in production
  dsn: string,
  sdk?: SdkConfig
  integrations?: {
    GlobalHandlers?: boolean | GlobalHandlersOptions
    TryCatch?: boolean | TryCatchOptions
    Breadcrumbs?: boolean | BreadcrumbsOptions
    LinkedErrors?: boolean | LinkedErrorsOptions
    HttpContext?: boolean 
    Dedupe?: boolean
    FunctionToString?: boolean
    InboundFilters?: boolean | InboundFiltersOptions
    Replay?: boolean | ReplayConfiguration
    BrowserTracing?: boolean | BrowserTracingOptions
    BrowserProfiling?: boolean
  }
}
```

App config:

```ts
sentry: {
  sdk?: (app: NuxtApp) => SdkConfig | SdkConfig
  integrations?: IntegrationOptions
}
```

`IntegrationOptions`:

`true` enables the integration with default options.
`false` disables the integration.

The default integrations that are enabled are:
- Breadcrumbs
- Dedupe
- FunctionToString
- GlobalHandlers
- HttpContext
- InboundFilters
- LinkedErrors
- TryCatch

```ts
{
  breadcrumbs?: boolean | BreadcrumbsOptions, // default: true
  browserTracing?: boolean | BrowserTracingOptions,
  browserProfiling?: boolean,
  captureConsole?: boolean | CaptureConsoleOptions,
  contextLines?: boolean | ContextLinesOptions,
  debug?: boolean | DebugOptions,
  dedupe?: boolean, // default: true
  extraErrorData?: boolean | ExtraErrorDataOptions,
  functionToString?: boolean, // default: true
  globalHandlers?: boolean | GlobalHandlersOptions, // default: true
  httpClient?: boolean | HttpClientOptions,
  httpContext?: boolean, // default: true
  inboundFilters?: boolean | InboundFiltersOptions, // default: true
  linkedErrors?: boolean | LinkedErrorsOptions, // default: true
  moduleMetadata?: boolean,
  replay?: boolean | ReplayConfiguration,
  reportingObserver?: boolean | ReportingObserverOptions,
  rewriteFrames?: boolean | RewriteFramesOptions,
  sessionTiming?: boolean,
  tryCatch?: boolean | TryCatchOptions, // default: true
}
```

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

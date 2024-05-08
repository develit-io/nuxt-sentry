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

> You can also use environment variables to set the DSN using `NUXT_PUBLIC_SENTRY_DSN`

That's it! You can now use Nuxt Sentry in your Nuxt app ✨

## Configuration

The module can be configured by providing a `sentry` key in the `public` section of the `runtimeConfig` or `appConfig` in `nuxt.config.ts`.

The `clientSdk` object is passed directly to the Sentry SDK. It consists of the properties specified in the [Sentry documentation here](https://docs.sentry.io/platforms/javascript/configuration/options/).

The `clientIntegrations` object takes a key of the integration name and either a boolean value or the integration configuration. [See more details here](#configuring-integrations)

Runtime config:

```ts
sentry: {
  enabled?: boolean // Default: Enabled in production
  dsn: string,
  clientSdk?: SdkConfig
  clientIntegrations?: ClientIntegrationConfig
}
```

App config:

```ts
sentry: {
  clientSdk?: (app: NuxtApp) => SdkConfig | SdkConfig
  clientIntegrations?: ClientIntegrationConfig
}
```

### Configuring Integrations
If you would like to enable or configure specific integrations, you can do so by providing a `clientIntegrations` object in either `appConfig` or `runtimeConfig`. The key should be the name of the integration and the value should be either a boolean to enable or disable the integration or an object to configure the integration.

The default integrations that are enabled are:
- Breadcrumbs
- BrowserTracing
- Dedupe
- FunctionToString
- GlobalHandlers
- HttpContext
- InboundFilters
- LinkedErrors
- TryCatch

See the example below for adding and configuring integrations (You can also use `runtimeConfig` for this):

```ts
import { breadcrumbsIntegration } from "@sentry/vue"

defineNuxtConfig({
  appConfig: {
    sentry: {
      clientIntegrations: {
        Breadcrumbs: false, // Disable the default Breadcrumbs integration
        Debug: {
          stringify: true, // Configure the Debug integration
        },
        HttpClient: true, // Enable the HttpClient integration
      },
    },
  },
})
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

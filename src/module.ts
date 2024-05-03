import { type NuxtApp } from 'nuxt/app'
import { type SentryVitePluginOptions, sentryVitePlugin } from '@sentry/vite-plugin'
import { type Options as SentryVueOptions } from '@sentry/vue/types/types'
import defu from 'defu'
import { addPlugin, addVitePlugin, createResolver, defineNuxtModule, useLogger } from '@nuxt/kit'
import { type Plugin } from 'vite'

export interface ModuleOptions {
  /** @default true */
  deleteSourcemapsAfterUpload?: boolean

  vitePlugin: SentryVitePluginOptions
}

type SentryConfig = Partial<Omit<SentryVueOptions, 'Vue' | 'app' | 'dsn'>>

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    sentry: {
      dsn: string
      enabled?: boolean
      sdk?: SentryConfig
    }
  }
  interface NuxtConfig {
    sentry?: ModuleOptions
  }
  interface AppConfigInput {
    sentry?: {
      sdk?: (app: NuxtApp) => SentryConfig | SentryConfig
    }
  }
}

const logger = useLogger('nuxt:sentry')

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@binaryoverload/nuxt-sentry',
    configKey: 'sentry',
  },

  async setup(_moduleOptions, nuxt) {
    if (!nuxt.options.runtimeConfig.public.sentry?.dsn) {
      logger.warn('No Sentry DSN provided. Provide it in `runtimeConfig.public.sentry.dsn`')
      return
    }

    const moduleOptions = defu(_moduleOptions, {
      deleteSourcemapsAfterUpload: true,
      vitePlugin: {
        disable: process.env.NODE_ENV !== 'production' || !process.env.CI,
        release: {
          deploy: {
            env: process.env.NODE_ENV ?? 'development',
          },
        },
      },
    } satisfies Partial<ModuleOptions>)

    const resolver = createResolver(import.meta.url)

    nuxt.options.sourcemap.client = true

    const defaults: SentryVitePluginOptions = {}
    if (moduleOptions.deleteSourcemapsAfterUpload) {
      defaults.sourcemaps = {
        filesToDeleteAfterUpload: ['.output/**/*.map'],
      }
    }

    nuxt.options.build.transpile.push('@sentry/vue')

    addVitePlugin(() => sentryVitePlugin(defu(moduleOptions.vitePlugin, defaults)) as Plugin)

    addPlugin(resolver.resolve('./runtime/sentry.client'))
  },
})

import {
  BrowserTracing,
  Replay,
  captureException,
  init,
  vueRouterInstrumentation,
  withScope,
} from '@sentry/vue'
import type { Options } from '@sentry/vue/types/types'
import defu from 'defu'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin({
  enforce: 'pre',
  setup(nuxt) {
    const runtimeSentryConfig = useRuntimeConfig().public.sentry
    const appSentryConfig = useAppConfig().sentry

    const enabled = runtimeSentryConfig?.enabled ?? !process.dev
    const dsn = runtimeSentryConfig?.dsn
    const runtimeSdkConfig = runtimeSentryConfig?.sdk

    const appSdkConfig = appSentryConfig?.sdk
    const appConfig = typeof appSdkConfig === 'function' ? appSdkConfig(nuxt.vueApp) : appSdkConfig

    const config: Partial<Options> = defu(runtimeSdkConfig, appConfig, {
      integrations: [
        new BrowserTracing({
          routingInstrumentation: vueRouterInstrumentation(nuxt.vueApp.$nuxt.$router, {
            routeLabel: 'path',
          }),
        }),
        new Replay(),
      ],
      tracesSampleRate: 1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1,
      environment: process.dev ? 'development' : 'production',
      enabled,
    })

    init({
      app: nuxt.vueApp,
      dsn,
      ...config,
    })

    nuxt.vueApp.config.errorHandler = (err, context) => {
      withScope((scope) => {
        scope.setExtra('context', context)
        captureException(err)
      })
    }

    nuxt.hook('app:error', (err) => {
      captureException(err)
    })
  },
})

import type { Integration } from "@sentry/types"
import type { Options } from "@sentry/vue/types/types"

import { captureException, init, withScope } from "@sentry/vue"
import defu from "defu"
import { defineNuxtPlugin, useAppConfig, useRuntimeConfig } from "nuxt/app"

import {
  type AppConfig,
  type IntegrationOptions,
  defaultIntegrations,
  integrationMap,
} from "../types"

export default defineNuxtPlugin({
  enforce: "pre",
  setup(nuxt) {
    const runtimeSentryConfig = useRuntimeConfig().public.sentry
    const appSentryConfig = useAppConfig().sentry as AppConfig | undefined

    const enabled = runtimeSentryConfig?.enabled ?? !process.dev
    const dsn = runtimeSentryConfig?.dsn
    const runtimeSdkConfig = runtimeSentryConfig?.sdk

    const appSdkConfig = appSentryConfig?.sdk
    const appConfig =
      typeof appSdkConfig === "function" ? appSdkConfig(nuxt.vueApp.$nuxt) : appSdkConfig

    const integrationConfig: IntegrationOptions = defu(
      runtimeSentryConfig.integrations,
      appSentryConfig?.integrations,
    )

    const integrations = buildIntegrations(integrationConfig)

    const config: Partial<Options> = defu(runtimeSdkConfig, appConfig, {
      integrations,
      defaultIntegrations: false,
      tracesSampleRate: 1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1,
      environment: process.dev ? "development" : "production",
      enabled,
    } as const)

    init({
      app: nuxt.vueApp,
      dsn,
      ...config,
    })

    nuxt.vueApp.config.errorHandler = (err, context) => {
      withScope((scope) => {
        scope.setExtra("context", context)
        captureException(err)
      })
    }

    nuxt.hook("app:error", (err) => {
      captureException(err)
    })
  },
})

function buildIntegrations(integrationConfig: IntegrationOptions) {
  const integrations: Integration[] = []

  for (const key of Object.keys(integrationMap)) {
    // We need to cast here so we can pass the options to the integration - some methods don't have parameters
    const integration = integrationMap[key as keyof typeof integrationMap] as any
    const integrationOptions = integrationConfig[key as keyof IntegrationOptions]

    if (integrationOptions === undefined) {
      // If the integration is not configured but is a default, add it
      if (defaultIntegrations.includes(key as keyof typeof integrationMap)) {
        integrations.push(integration())
        continue
      }

      continue
    }

    // If the integration is disabled, skip it
    if (integrationOptions === false) {
      continue
    }

    const config = integrationOptions === true ? undefined : integrationOptions

    integrations.push(integration(config))
  }

  return integrations
}

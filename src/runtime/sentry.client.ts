import type { AppConfig, SentryIntegrations } from "../types"
import type { Integration } from "@sentry/types"
import type { Options } from "@sentry/vue/types/types"
import type { NuxtSSRContext } from "nuxt/dist/app/nuxt"

import {
  Breadcrumbs,
  BrowserProfilingIntegration,
  BrowserTracing,
  Dedupe,
  FunctionToString,
  GlobalHandlers,
  HttpContext,
  InboundFilters,
  LinkedErrors,
  Replay,
  TryCatch,
  captureException,
  init,
  vueRouterInstrumentation,
  withScope,
} from "@sentry/vue"
import defu from "defu"
import { defineNuxtPlugin } from "nuxt/app"

type NuxtApp = NuxtSSRContext["nuxt"]

export default defineNuxtPlugin({
  enforce: "pre",
  setup(nuxt) {
    const runtimeSentryConfig = useRuntimeConfig().public.sentry
    const appSentryConfig = useAppConfig().sentry as AppConfig

    const enabled = runtimeSentryConfig?.enabled ?? !process.dev
    const dsn = runtimeSentryConfig?.dsn
    const runtimeSdkConfig = runtimeSentryConfig?.sdk

    const appSdkConfig = appSentryConfig?.sdk
    const appConfig =
      typeof appSdkConfig === "function" ? appSdkConfig(nuxt.vueApp.$nuxt) : appSdkConfig

    const integrationConfig: SentryIntegrations = defu(
      runtimeSentryConfig.integrations,
      appSentryConfig.integrations,
      {
        BrowserTracing: true,
        Replay: true,
      },
    )

    const integrations = buildIntegrations(integrationConfig, nuxt)

    const config: Partial<Options> = defu(runtimeSdkConfig, appConfig, {
      integrations,
      tracesSampleRate: 1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1,
      environment: process.dev ? "development" : "production",
      enabled,
    })

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

function buildIntegrations(integrationConfig: SentryIntegrations, nuxt: NuxtApp) {
  const integrations: Integration[] = []

  if (integrationConfig.BrowserTracing) {
    const browserTracingConfig =
      integrationConfig.BrowserTracing === true ? {} : integrationConfig.BrowserTracing
    integrations.push(
      new BrowserTracing({
        routingInstrumentation: vueRouterInstrumentation(nuxt.vueApp.$nuxt.$router),
        ...browserTracingConfig,
      }),
    )
  }

  if (integrationConfig.Replay) {
    const replayConfig = integrationConfig.Replay === true ? undefined : integrationConfig.Replay
    integrations.push(new Replay(replayConfig))
  }

  if (integrationConfig.BrowserProfiling) {
    integrations.push(new BrowserProfilingIntegration())
  }

  if (integrationConfig.GlobalHandlers) {
    const globalHandlersConfig =
      integrationConfig.GlobalHandlers === true ? undefined : integrationConfig.GlobalHandlers
    integrations.push(new GlobalHandlers(globalHandlersConfig))
  }

  if (integrationConfig.TryCatch) {
    const tryCatchConfig =
      integrationConfig.TryCatch === true ? undefined : integrationConfig.TryCatch
    integrations.push(new TryCatch(tryCatchConfig))
  }

  if (integrationConfig.Breadcrumbs) {
    const breadcrumbsConfig =
      integrationConfig.Breadcrumbs === true ? undefined : integrationConfig.Breadcrumbs
    integrations.push(new Breadcrumbs(breadcrumbsConfig))
  }

  if (integrationConfig.LinkedErrors) {
    const linkedErrorsConfig =
      integrationConfig.LinkedErrors === true ? undefined : integrationConfig.LinkedErrors
    integrations.push(new LinkedErrors(linkedErrorsConfig))
  }

  if (integrationConfig.HttpContext) {
    integrations.push(new HttpContext())
  }

  if (integrationConfig.Dedupe) {
    integrations.push(new Dedupe())
  }

  if (integrationConfig.FunctionToString) {
    integrations.push(new FunctionToString())
  }

  if (integrationConfig.InboundFilters) {
    const inboundFiltersConfig =
      integrationConfig.InboundFilters === true ? undefined : integrationConfig.InboundFilters
    integrations.push(new InboundFilters(inboundFiltersConfig))
  }
}

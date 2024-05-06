import type { SentryVitePluginOptions } from "@sentry/vite-plugin"
import type { Options as SentryVueOptions } from "@sentry/vue/types/types"
import type { NuxtApp } from "nuxt/app"

import {
  breadcrumbsIntegration,
  browserApiErrorsIntegration,
  browserProfilingIntegration,
  browserTracingIntegration,
  captureConsoleIntegration,
  contextLinesIntegration,
  debugIntegration,
  dedupeIntegration,
  extraErrorDataIntegration,
  functionToStringIntegration,
  globalHandlersIntegration,
  httpClientIntegration,
  httpContextIntegration,
  inboundFiltersIntegration,
  linkedErrorsIntegration,
  moduleMetadataIntegration,
  replayIntegration,
  reportingObserverIntegration,
  rewriteFramesIntegration,
  sessionTimingIntegration,
} from "@sentry/vue"

export type SentryConfig = Partial<Omit<SentryVueOptions, "Vue" | "app" | "dsn">>

export const integrationMap = {
  breadcrumbs: breadcrumbsIntegration,
  browserTracing: browserTracingIntegration,
  browserProfiling: browserProfilingIntegration,
  captureConsole: captureConsoleIntegration,
  contextLines: contextLinesIntegration,
  debug: debugIntegration,
  dedupe: dedupeIntegration,
  extraErrorData: extraErrorDataIntegration,
  functionToString: functionToStringIntegration,
  globalHandlers: globalHandlersIntegration,
  httpClient: httpClientIntegration,
  httpContext: httpContextIntegration,
  inboundFilters: inboundFiltersIntegration,
  linkedErrors: linkedErrorsIntegration,
  moduleMetadata: moduleMetadataIntegration,
  replay: replayIntegration,
  reportingObserver: reportingObserverIntegration,
  rewriteFrames: rewriteFramesIntegration,
  sessionTiming: sessionTimingIntegration,
  tryCatch: browserApiErrorsIntegration,
} as const

export const defaultIntegrations: (keyof typeof integrationMap)[] = [
  "breadcrumbs",
  "dedupe",
  "functionToString",
  "globalHandlers",
  "httpContext",
  "inboundFilters",
  "linkedErrors",
  "tryCatch",
]

export type IntegrationOptions = {
  [key in keyof typeof integrationMap]?: IntegrationOptionExtract<(typeof integrationMap)[key]>
}

type IntegrationOptionExtract<T extends (...args: any) => any> = Parameters<T>[0] extends infer P
  ? Exclude<P, undefined> | boolean
  : never

export interface ModuleOptions {
  /** @default true */
  deleteSourcemapsAfterUpload?: boolean
  vitePlugin: SentryVitePluginOptions
}

export interface RuntimeConfig {
  dsn: string
  enabled?: boolean
  integrations?: IntegrationOptions
  sdk?: SentryConfig
}

export interface AppConfig {
  sdk?: SentryConfig | ((app: NuxtApp) => SentryConfig)
  integrations?: IntegrationOptions
}

declare module "@nuxt/schema" {
  interface PublicRuntimeConfig {
    sentry: RuntimeConfig
  }
  interface NuxtConfig {
    sentry?: ModuleOptions
  }
  interface AppConfigInput {
    sentry?: AppConfig
  }
}

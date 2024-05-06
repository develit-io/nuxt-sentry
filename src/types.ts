import type { SentryVitePluginOptions } from "@sentry/vite-plugin"
import type { Options as SentryVueOptions } from "@sentry/vue/types/types"
import type { NuxtApp } from "nuxt/app"

export type SentryConfig = Partial<Omit<SentryVueOptions, "Vue" | "app" | "dsn">>

export interface DisableIntegrationConfig {
  Breadcrumbs?: true
  BrowserTracing?: true
  CaptureConsole?: true
  ContextLines?: true
  Debug?: true
  Dedupe?: true
  ExtraErrorData?: true
  FunctionToString?: true
  GlobalHandlers?: true
  HttpClient?: true
  HttpContext?: true
  InboundFilters?: true
  LinkedErrors?: true
  ModuleMetadata?: true
  Replay?: true
  ReportingObserver?: true
  RewriteFrames?: true
  SessionTiming?: true
  TryCatch?: true
  [key: string]: true | undefined
}

export interface ModuleOptions {
  /** @default true */
  deleteSourcemapsAfterUpload?: boolean
  vitePlugin: SentryVitePluginOptions
}

export interface RuntimeConfig {
  dsn: string
  enabled?: boolean
  disableIntegrations?: DisableIntegrationConfig
  sdk?: SentryConfig
}

export interface AppConfig {
  sdk?: SentryConfig | ((app: NuxtApp) => SentryConfig)
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

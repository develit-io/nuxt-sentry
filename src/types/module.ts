import type { IntegrationConfig } from "./integrations"
import type { SentryVitePluginOptions } from "@sentry/vite-plugin"
import type { Options as SentryVueOptions } from "@sentry/vue/types/types"
import type { NuxtApp } from "nuxt/app"

export type SentryConfig = Partial<Omit<SentryVueOptions, "Vue" | "app" | "dsn">>

export interface SentryModuleOptions {
  /** @default true */
  enabled?: boolean
  /** @default true */
  deleteSourcemapsAfterUpload?: boolean
  vitePlugin: SentryVitePluginOptions
}

export interface SentryRuntimeConfig {
  dsn: string
  enabled?: boolean
  clientIntegrations?: IntegrationConfig
  clientSdk?: SentryConfig
}

export interface SentryAppConfig {
  clientIntegrations?: IntegrationConfig
  clientSdk?: SentryConfig | ((app: NuxtApp) => SentryConfig)
}

declare module "@nuxt/schema" {
  interface PublicRuntimeConfig {
    sentry: SentryRuntimeConfig
  }
  interface NuxtConfig {
    sentry?: SentryModuleOptions
  }
  interface AppConfigInput {
    sentry?: SentryAppConfig
  }
  interface AppConfig {
    sentry?: SentryAppConfig
  }
}

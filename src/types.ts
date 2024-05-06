import type { SentryVitePluginOptions } from "@sentry/vite-plugin"
import type { BrowserTracing, Integrations, Replay } from "@sentry/vue"
import type { Options as SentryVueOptions } from "@sentry/vue/types/types"
import type { NuxtApp } from "nuxt/app"

export type SentryConfig = Partial<Omit<SentryVueOptions, "Vue" | "app" | "dsn">>
export type SentryIntegrations = {
  [key in keyof typeof Integrations]?: IntegrationOptions<(typeof Integrations)[key]> | false
} & {
  Replay: IntegrationOptions<typeof Replay> | false
  BrowserTracing: IntegrationOptions<typeof BrowserTracing> | false
  BrowserProfiling: boolean
}

type IntegrationOptions<T extends abstract new (...args: any) => any> =
  ConstructorParameters<T>[0] extends infer P ? (undefined extends P ? P | true : P) : never

export interface ModuleOptions {
  /** @default true */
  deleteSourcemapsAfterUpload?: boolean
  vitePlugin: SentryVitePluginOptions
}

export interface RuntimeConfig {
  dsn: string
  enabled?: boolean
  integrations?: SentryIntegrations
  sdk?: SentryConfig
}

export interface AppConfig {
  sdk?: SentryConfig | ((app: NuxtApp) => SentryConfig)
  integrations?: SentryIntegrations
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

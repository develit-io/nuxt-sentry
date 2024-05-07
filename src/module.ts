import type { ModuleOptions } from "./types"
import type { Plugin } from "vite"

import {
  addPlugin,
  addTypeTemplate,
  addVitePlugin,
  createResolver,
  defineNuxtModule,
} from "@nuxt/kit"
import { useLogger } from "@nuxt/kit"
import { type SentryVitePluginOptions, sentryVitePlugin } from "@sentry/vite-plugin"
import defu from "defu"

const logger = useLogger("nuxt:sentry")

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@binaryoverload/nuxt-sentry",
    configKey: "sentry",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },

  async setup(_moduleOptions, nuxt) {
    if (!nuxt.options.runtimeConfig.public.sentry?.dsn) {
      logger.warn("No Sentry DSN provided. Provide it in `runtimeConfig.public.sentry.dsn`")
      return
    }

    const moduleOptions = defu(_moduleOptions, {
      deleteSourcemapsAfterUpload: true,
      vitePlugin: {
        disable: process.env.NODE_ENV !== "production" || !process.env.CI,
        release: {
          deploy: {
            env: process.env.NODE_ENV ?? "development",
          },
        },
      },
    } satisfies Partial<ModuleOptions>)

    const resolver = createResolver(import.meta.url)

    nuxt.options.sourcemap.client = true

    const defaults: SentryVitePluginOptions = {}
    if (moduleOptions.deleteSourcemapsAfterUpload) {
      defaults.sourcemaps = {
        filesToDeleteAfterUpload: [".output/**/*.map"],
      }
    }

    nuxt.options.build.transpile.push("@sentry/vue")

    addVitePlugin(() => sentryVitePlugin(defu(moduleOptions.vitePlugin, defaults)) as Plugin)

    addPlugin(resolver.resolve("./runtime/sentry.client"))

    addTypeTemplate({
      filename: "types/nuxt-sentry.d.ts",
      src: resolver.resolve("./module.d.ts"),
    })
  },
})

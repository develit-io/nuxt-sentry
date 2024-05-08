/*

  This file contains types for the integrations that are supported by the Sentry JS SDK.

  Unfortunately, the Sentry SDK does not export all types for the integrations, so we have to define them ourselves.

*/

import type { replayIntegration } from "@sentry/vue"
import type { browserTracingIntegration } from "@sentry-internal/tracing"

export interface IntegrationConfig {
  Breadcrumbs?: BreadcrumbsOptions | boolean
  BrowserTracing?: BrowserTracingOptions | boolean
  CaptureConsole?: CaptureConsoleOptions | boolean
  ContextLines?: ContextLinesOptions | boolean
  Debug?: DebugOptions | boolean
  Dedupe?: boolean
  ExtraErrorData?: ExtraErrorDataOptions | boolean
  FunctionToString?: boolean
  GlobalHandlers?: GlobalHandlersOptions | boolean
  HttpClient?: HttpClientOptions | boolean
  HttpContext?: boolean
  InboundFilters?: InboundFiltersOptions | boolean
  LinkedErrors?: LinkedErrorsOptions | boolean
  ModuleMetadata?: boolean
  Replay?: ReplayConfiguration | boolean
  ReportingObserver?: ReportingObserverOptions | boolean
  SessionTiming?: boolean
  TryCatch?: boolean
}

export type Integrations = keyof IntegrationConfig

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/browser/src/integrations/breadcrumbs.ts
export interface BreadcrumbsOptions {
  console: boolean
  dom:
    | boolean
    | {
        serializeAttribute?: string | string[]
        maxStringLength?: number
      }
  fetch: boolean
  history: boolean
  sentry: boolean
  xhr: boolean
}

export type OriginalBrowserTracingOptions = Exclude<
  Parameters<typeof browserTracingIntegration>[0],
  undefined
>

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/vue/src/browserTracingIntegration.ts
export interface BrowserTracingOptions extends OriginalBrowserTracingOptions {
  /**
   * What to use for route labels.
   * By default, we use route.name (if set) and else the path.
   *
   * Default: 'name'
   */
  routeLabel?: "name" | "path"
}

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/core/src/integrations/captureconsole.ts
export interface CaptureConsoleOptions {
  levels?: string[]
}

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/browser/src/integrations/contextlines.ts
export interface ContextLinesOptions {
  /**
   * Sets the number of context lines for each frame when loading a file.
   * Defaults to 7.
   *
   * Set to 0 to disable loading and inclusion of source files.
   **/
  frameContextLines?: number
}

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/core/src/integrations/debug.ts
export interface DebugOptions {
  /** Controls whether console output created by this integration should be stringified. Default: `false` */
  stringify?: boolean
  /** Controls whether a debugger should be launched before an event is sent. Default: `false` */
  debugger?: boolean
}

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/core/src/integrations/extraerrordata.ts
export interface ExtraErrorDataOptions {
  /**
   * The object depth up to which to capture data on error objects.
   */
  depth: number

  /**
   * Whether to capture error causes. Defaults to true.
   *
   * More information: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
   */
  captureErrorCause: boolean
}

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/browser/src/integrations/globalhandlers.ts
export type GlobalHandlersIntegrationsOptionKeys = "onerror" | "onunhandledrejection"

export type GlobalHandlersOptions = Record<GlobalHandlersIntegrationsOptionKeys, boolean>

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/browser/src/integrations/httpclient.ts
export type HttpStatusCodeRange = [number, number] | number
export type HttpRequestTarget = string | RegExp

export interface HttpClientOptions {
  /**
   * HTTP status codes that should be considered failed.
   * This array can contain tuples of `[begin, end]` (both inclusive),
   * single status codes, or a combinations of both
   *
   * Example: [[500, 505], 507]
   * Default: [[500, 599]]
   */
  failedRequestStatusCodes: HttpStatusCodeRange[]

  /**
   * Targets to track for failed requests.
   * This array can contain strings or regular expressions.
   *
   * Example: ['http://localhost', /api\/.*\/]
   * Default: [/.*\/]
   */
  failedRequestTargets: HttpRequestTarget[]
}

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/core/src/integrations/inboundfilters.ts
export interface InboundFiltersOptions {
  allowUrls: Array<string | RegExp>
  denyUrls: Array<string | RegExp>
  ignoreErrors: Array<string | RegExp>
  ignoreTransactions: Array<string | RegExp>
  ignoreInternal: boolean
  disableErrorDefaults: boolean
}

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/browser/src/integrations/linkederrors.ts
export interface LinkedErrorsOptions {
  key?: string
  limit?: number
}

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/replay-internal/src/types/replay.ts
export type ReplayConfiguration = Exclude<Parameters<typeof replayIntegration>[0], undefined>

// https://github.com/getsentry/sentry-javascript/blob/develop/packages/browser/src/integrations/reportingobserver.ts
export type ReportTypes = "crash" | "deprecation" | "intervention"

export interface ReportingObserverOptions {
  types?: ReportTypes[]
}

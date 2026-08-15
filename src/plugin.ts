import type { Context } from './context.js'

export interface Plugin {
  inject?: string[]
  setup(ctx: Context): void
}

import type { Plugin } from './plugin.js'

export class Context {
  use(plugin: Plugin): void {
    plugin(this)
  }
}

import type { Plugin } from './plugin.js'

export class Context {
  private readonly cleanups: Array<() => void> = []

  use(plugin: Plugin): void {
    plugin(this)
  }

  effect(cleanup: () => void): void {
    this.cleanups.push(cleanup)
  }

  dispose(): void {
    while (this.cleanups.length > 0) {
      this.cleanups.pop()?.()
    }
  }
}

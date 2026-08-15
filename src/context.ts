import type { Plugin } from './plugin.js'

export class Context {
  private readonly cleanups: Array<() => void> = []
  private readonly services = new Map<string, unknown>()

  use(plugin: Plugin): void {
    for (const name of plugin.inject ?? []) {
      if (!this.services.has(name)) {
        throw new Error(`Missing service: ${name}`)
      }
    }

    plugin.setup(this)
  }

  effect(cleanup: () => void): void {
    this.cleanups.push(cleanup)
  }

  provide(name: string, service: unknown): void {
    this.services.set(name, service)
  }

  getService(name: string): unknown {
    return this.services.get(name)
  }

  dispose(): void {
    while (this.cleanups.length > 0) {
      this.cleanups.pop()?.()
    }
  }
}

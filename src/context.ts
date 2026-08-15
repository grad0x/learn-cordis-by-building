import type { Plugin } from './plugin.js'

export class Context {
  private readonly cleanups: Array<() => void> = []
  private readonly services = new Map<string, unknown>()
  private readonly children: Context[] = []

  constructor(public readonly parent?: Context) {}

  createChild(): Context {
    const child = new Context(this)

    this.children.push(child)

    return child
  }

  use(plugin: Plugin): Context {
    for (const name of plugin.inject ?? []) {
      if (!this.hasService(name)) {
        throw new Error(`Missing service: ${name}`)
      }
    }

    const child = this.createChild()

    plugin.setup(child)

    for (const [name, service] of child.services) {
      this.services.set(name, service)
    }

    return child
  }

  effect(cleanup: () => void): void {
    this.cleanups.push(cleanup)
  }

  provide(name: string, service: unknown): void {
    this.services.set(name, service)
  }

  getService(name: string): unknown {
    if (this.services.has(name)) {
      return this.services.get(name)
    }

    return this.parent?.getService(name)
  }

  dispose(): void {
    while (this.children.length > 0) {
      this.children.pop()?.dispose()
    }

    while (this.cleanups.length > 0) {
      this.cleanups.pop()?.()
    }

    this.parent?.removeChild(this)
  }

  private hasService(name: string): boolean {
    return this.services.has(name) || this.parent?.hasService(name) === true
  }

  private removeChild(child: Context): void {
    const index = this.children.indexOf(child)

    if (index !== -1) {
      this.children.splice(index, 1)
    }
  }
}

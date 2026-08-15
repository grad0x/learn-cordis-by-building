import { Context } from '../src/context.js'
import type { Plugin } from '../src/plugin.js'

interface MemoryService {
  save(value: string): void
  list(): string[]
}

const memoryPlugin: Plugin = {
  setup(ctx) {
    const store: string[] = []
    const memory: MemoryService = {
      save(value) {
        store.push(value)
      },

      list() {
        return store
      },
    }

    ctx.provide('memory', memory)
    console.log('memory service registered')
  },
}

const taskPlugin: Plugin = {
  inject: ['memory'],

  setup(ctx) {
    const memory = ctx.getService('memory') as MemoryService

    console.log('task plugin injected memory')
    memory.save('hello cordis')
    console.log('task saved')
  },
}

const ctx = new Context()

ctx.use(memoryPlugin)
ctx.use(taskPlugin)

const memory = ctx.getService('memory') as MemoryService

console.log('saved:')
console.log(memory.list().join('\n'))

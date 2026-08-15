import { Context } from '../src/context.js'
import type { Plugin } from '../src/plugin.js'

const loggerPlugin: Plugin = (ctx) => {
  console.log('logger plugin installed')
}

const ctx = new Context()

ctx.use(loggerPlugin)

import { Context } from '../src/context.js'
import type { Plugin } from '../src/plugin.js'

const timerPlugin: Plugin = {
  setup(ctx) {
    const timer = setInterval(() => {
      console.log('tick')
    }, 100)

    ctx.effect(() => {
      clearInterval(timer)
      console.log('timer cleaned')
    })
  },
}

const loggerPlugin: Plugin = {
  setup(ctx) {
    const logger = setInterval(() => {
      console.log('logger running')
    }, 150)

    ctx.effect(() => {
      clearInterval(logger)
      console.log('logger cleaned')
    })
  },
}

const ctx = new Context()

const timerContext = ctx.use(timerPlugin)
const loggerContext = ctx.use(loggerPlugin)

setTimeout(() => {
  console.log('dispose timer plugin')
  timerContext.dispose()
}, 350)

setTimeout(() => {
  console.log('logger still running')
  loggerContext.dispose()
}, 700)

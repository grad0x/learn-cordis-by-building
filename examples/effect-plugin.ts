import { Context } from '../src/context.js'
import type { Plugin } from '../src/plugin.js'

const timerPlugin: Plugin = (ctx) => {
  const timer = setInterval(() => {
    console.log('tick')
  }, 100)

  ctx.effect(() => {
    clearInterval(timer)
    console.log('timer cleaned')
  })
}

const ctx = new Context()

ctx.use(timerPlugin)

setTimeout(() => {
  ctx.dispose()
}, 500)

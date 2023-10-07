import { rest } from 'msw'
import { Resolver } from './utils'

const resolvers = {
  'exists user richard_01 to richard_99': (): Resolver => (req, res, ctx) =>
    /^richard_\d{2}$/.test(req.params.username.toString())
      ? res(
          ctx.status(200),
          ctx.json({ _tag: 'Administrator', name: req.params.username })
        )
      : res(ctx.status(404)),
  'database connection is broken': (): Resolver => (req, res, ctx) =>
    res(ctx.status(500)),
}

export const getUserHandler =
  (baseUrl: string) => (key: keyof typeof resolvers) =>
    rest.get(`${baseUrl}/api/v1/users/:username`, resolvers[key]())

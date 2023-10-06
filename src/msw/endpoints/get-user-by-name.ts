import { rest } from 'msw'
import { Resolver } from './utils'

const resolvers = {
  '200 admin': (): Resolver => (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({ _tag: 'Administrator', name: req.params.username })
    ),
  '200 admin once': (): Resolver => (req, res, ctx) =>
    res.once(
      ctx.status(200),
      ctx.json({ _tag: 'Administrator', name: req.params.username })
    ),
  '200 invalid': (): Resolver => (req, res, ctx) =>
    res(ctx.status(200), ctx.json('lol')),
  '404': (): Resolver => (req, res, ctx) => res(ctx.status(404)),
  '404 once': (): Resolver => (req, res, ctx) => res.once(ctx.status(404)),
  '500': (): Resolver => (req, res, ctx) => res(ctx.status(500)),
}

export const getUsersByNameHandler =
  (baseUrl: string) => (key: keyof typeof resolvers) =>
    rest.get(`${baseUrl}/api/v1/users/:username`, resolvers[key]())

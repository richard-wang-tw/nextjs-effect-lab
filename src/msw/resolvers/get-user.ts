import { Resolver } from './utils'

export const getUser200: Resolver = (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({ _tag: 'Administrator', name: req.params.username })
  )

export const getUser200Once: Resolver = (req, res, ctx) =>
  res.once(
    ctx.status(200),
    ctx.json({ _tag: 'Administrator', name: req.params.username })
  )

export const getUser200Invalid: Resolver = (req, res, ctx) =>
  res(ctx.status(200), ctx.json('lol'))

export const getUser404: Resolver = (req, res, ctx) => res(ctx.status(404))

export const getUser404Once: Resolver = (req, res, ctx) =>
  res.once(ctx.status(404))

export const getUser500: Resolver = (req, res, ctx) => res(ctx.status(500))

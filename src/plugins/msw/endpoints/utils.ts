import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
  rest,
} from 'msw'

export interface Resolver
  extends ResponseResolver<
    RestRequest<never, PathParams<string>>,
    RestContext,
    DefaultBodyType
  > {}

export const resolve404: Resolver = (req, res, ctx) => res(ctx.status(404))

export const resolve404Once: Resolver = (req, res, ctx) =>
  res.once(ctx.status(404))

export const resolve500: Resolver = (req, res, ctx) => res(ctx.status(500))

export const handler =
  (resolver: Resolver) =>
  ({ method, url }: { method: keyof typeof rest; url: string }) =>
    rest[method](url, resolver)

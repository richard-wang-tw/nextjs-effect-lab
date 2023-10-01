import {
  DefaultBodyType,
  PathParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from 'msw'

export interface Resolver
  extends ResponseResolver<
    RestRequest<never, PathParams<string>>,
    RestContext,
    DefaultBodyType
  > {}

import { MongooseExConnectError } from '@/plugins/mongoose-ex/error'
import { EnvError } from '@/service/env'
import { DatabaseError } from './database-error'
import { TransformError } from './transform-error'

export type ModelError =
  | DatabaseError
  | EnvError
  | MongooseExConnectError
  | TransformError

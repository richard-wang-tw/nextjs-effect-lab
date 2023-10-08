import connect from './connect'

interface MongooseEx {
  connect: (uri: string) => Promise<void>
}

const MongooseEx: MongooseEx = {
  connect,
}

export default MongooseEx

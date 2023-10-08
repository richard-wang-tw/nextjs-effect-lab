import { UserModel } from '@/app/api/models/user'
import MongooseEx from '@/plugins/mongoose-ex'
import { NextResponse } from 'next/server'

interface Route {
  params: { username: string }
}

export const GET = async (request: Request, route: Route) => {
  const uri = process.env.DB_URI as string
  await MongooseEx.connect(uri)
  const result = await UserModel.findOne({ name: route.params.username })
  return NextResponse.json({
    name: result?.name ?? '',
    _tag: result?.role ?? '',
  })
}

export const GET = (req: Request, { params }: { params: { user: string } }) => {
  return new Response(
    JSON.stringify({ _tag: 'Administrator', name: params.user })
  )
}

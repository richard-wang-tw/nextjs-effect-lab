import { redirect } from 'next/navigation'

const Page = () => {
  //TODO: when user is admin, goto edit page, else show my courses page
  redirect('/edit/courses/all')
}

export default Page

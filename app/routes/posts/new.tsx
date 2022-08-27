import { redirect } from '@remix-run/node'
import { Heading } from '@chakra-ui/react'

import NewPostForm from '~/components/new-post-form'

export const action = async ({ request }: { request: Request }) => {
  const form = await request.formData()
  const title = form.get('title')
  const content = form.get('content')

  const fields = { title, content }
  console.log(fields)

  // todo - submit to database

  return redirect('/posts')
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  console.log(error)

  return (
    <section className="flex flex-col items-center gap-4">
      <Heading>Error</Heading>
      <pre className="whitespace-pre-wrap">{error.message}</pre>
    </section>
  )
}

export default function New() {
  return (
    <section className="flex flex-col items-center gap-4">
      <Heading>New Post</Heading>
      <NewPostForm />
    </section>
  )
}

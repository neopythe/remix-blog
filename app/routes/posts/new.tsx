import { redirect } from '@remix-run/node'
import { Heading } from '@chakra-ui/react'
import { prisma } from '~/db'

import NewPostForm from '~/components/new-post-form'

export const action = async ({ request }: { request: Request }) => {
  const form = await request.formData()
  const title = String(form.get('title'))
  const content = String(form.get('content'))

  const fields = { title, content }
  const post = await prisma.post.create({ data: fields })

  return redirect(`/posts/${post.id}`)
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
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
      <NewPostForm />
    </section>
  )
}

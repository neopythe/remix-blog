import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Heading } from '@chakra-ui/react'
import { prisma } from '~/db'

import Button from '~/components/button'

export const loader = async ({ params }: { params: any }) => {
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  })

  if (!post) throw new Error('Post not found')

  const data = { post }
  return data
}

export const action = async ({
  params,
  request,
}: {
  params: any
  request: Request
}) => {
  const form = await request.formData()
  if (String(form.get('_method')) === 'delete') {
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
    })

    if (!post) throw new Error('Post not found')

    await prisma.post.delete({ where: { id: params.postId } })
    return redirect('/posts')
  }
}

export default function Post() {
  const { post } = useLoaderData()

  return (
    <div className="flex flex-col gap-4">
      <Heading>{post.title}</Heading>
      <span>
        by <span className="text-brand-blue-500">anonymous</span>
      </span>
      <span className="text-sm">
        {new Date(post.createdAt).toLocaleString()}
      </span>
      <p>{post.content}</p>
      <form>
        <input type="hidden" name="_method" value="delete" />
        <Button>Delete</Button>
      </form>
    </div>
  )
}

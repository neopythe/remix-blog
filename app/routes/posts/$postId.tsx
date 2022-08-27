import { useLoaderData } from '@remix-run/react'
import { Heading } from '@chakra-ui/react'
import { prisma } from '~/db'

export const loader = async ({ params }: { params: any }) => {
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  })

  if (!post) throw new Error('Post not found')

  const data = { post }
  return data
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
    </div>
  )
}

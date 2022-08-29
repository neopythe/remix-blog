import { Link, useLoaderData } from '@remix-run/react'
import { Heading } from '@chakra-ui/react'
import { prisma } from '~/db'

import Button from '~/components/button'

export const loader = async () => {
  const data = {
    posts: await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    }),
  }
  return data
}

export default function Posts() {
  const { posts } = useLoaderData()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Heading>Posts</Heading>
        <Link to="/posts/new">
          <Button>New post</Button>
        </Link>
      </div>
      <ul className="flex flex-col gap-4">
        {(!posts || posts.length === 0) && (
          <span>
            <Link to="/posts/new">
              <span className="text-brand-blue-500">Add a new post</span>
            </Link>{' '}
            to get started.
          </span>
        )}
        {posts.map(
          (post: {
            content: string
            createdAt: Date
            id: string
            title: string
          }) => (
            <li key={post.id} className="border rounded border-gray-200 p-4">
              <Link to={`/posts/${post.id}`}>
                <div className="flex flex-col">
                  <span className="font-semibold">{post.title}</span>
                  <span className="flex gap-1">
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                    <span>
                      by <span className="text-brand-blue-500">anonymous</span>
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

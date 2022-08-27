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
    <div className="flex flex-col gap-4">
      <Heading>Posts</Heading>
      <ul className="flex flex-col gap-4">
        {posts.map((post: any) => (
          <li key={post.id}>
            <div className="border p-4">
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
            </div>
          </li>
        ))}
      </ul>
      <Link to="/posts/new">
        <Button>New post</Button>
      </Link>
    </div>
  )
}

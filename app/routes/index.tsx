import { Link, useLoaderData } from '@remix-run/react'
import { useTheme } from '@chakra-ui/react'
import { prisma } from '~/db'

import BoxGrid from '~/components/box-grid'
import PostPreview from '~/components/post-preview'

export const loader = async () => {
  const data = {
    posts: await prisma.post.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
    }),
  }
  return data
}

export default function Home() {
  const theme = useTheme()
  const {
    colours: { blue },
  } = theme

  const { posts } = useLoaderData()

  return (
    <div className="flex flex-col items-end justify-between h-full">
      <section className="flex flex-col w-full gap-8">
        {(!posts || posts.length === 0) && (
          <span>
            Looks like there are no posts yet. Why not{' '}
            <Link to="/posts/new">
              <span className="text-brand-blue-500">add one</span>
            </Link>
            ?
          </span>
        )}
        {posts.map((post: any, index: number) => (
          <PostPreview
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            right={index % 2 !== 0}
          />
        ))}
      </section>
      <BoxGrid colour={blue} />
    </div>
  )
}

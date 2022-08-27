import { Link, useLoaderData } from '@remix-run/react'
import { Heading } from '@chakra-ui/react'
import Button from '~/components/button'

export const loader = () => {
  const data = {
    posts: [
      { id: 1, title: 'Post 1', body: 'This is a test post' },
      { id: 2, title: 'Post 2', body: 'This is a test post' },
      { id: 3, title: 'Post 3', body: 'This is a test post' },
    ],
  }
  return data
}

export default function Posts() {
  const { posts } = useLoaderData()

  return (
    <div className="flex flex-col items-center gap-4">
      <Heading>Posts</Heading>
      <ul className="flex flex-col gap-4">
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/posts/new">
        <Button>New post</Button>
      </Link>
    </div>
  )
}

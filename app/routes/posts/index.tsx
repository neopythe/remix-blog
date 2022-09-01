import { Link, useLoaderData } from '@remix-run/react';
import { Heading } from '@chakra-ui/react';
import { prisma } from '~/db';

import Button from '~/components/button';
import PostCard from '~/components/post-card';

export const loader = async () => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const data = {
    posts: await Promise.all(
      posts.map(async (post) => {
        const user = await prisma.user.findUnique({
          where: {
            id: post.userId,
          },
        });
        return {
          username: user?.username,
          ...post,
        };
      })
    ),
  };

  return data;
};

export default function Posts() {
  const { posts } = useLoaderData();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Heading>Posts</Heading>
        <Link to="/posts/new">
          <Button>New post</Button>
        </Link>
      </div>
      {(!posts || posts.length === 0) && (
        <span>
          <Link to="/posts/new">
            <span className="text-brand-blue-500">Add a new post</span>
          </Link>{' '}
          to get started.
        </span>
      )}
      {posts && (
        <ul className="flex flex-col gap-4">
          {posts.map(
            (post: {
              content: string;
              createdAt: Date;
              id: string;
              title: string;
              userId: string;
              username: string;
            }) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

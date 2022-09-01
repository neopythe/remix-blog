import { Link, useLoaderData } from '@remix-run/react';
import { useTheme } from '@chakra-ui/react';
import { prisma } from '~/db';

import BoxGrid from '~/components/box-grid';
import PostPreview from '~/components/post-preview';

export const loader = async () => {
  const posts = await prisma.post.findMany({
    take: 3,
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

export default function Home() {
  const theme = useTheme();
  const {
    colours: { blue },
  } = theme;

  const { posts } = useLoaderData();

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
        {posts.map(
          (
            post: {
              content: string;
              createdAt: Date;
              id: string;
              title: string;
              username: string;
            },
            index: number
          ) => (
            <PostPreview
              key={post.id}
              id={post.id}
              username={post.username}
              title={post.title}
              content={post.content}
              createdAt={post.createdAt}
              right={index % 2 !== 0}
            />
          )
        )}
      </section>
      <BoxGrid colour={blue} />
    </div>
  );
}

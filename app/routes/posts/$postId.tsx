import type { ActionFunction, LoaderFunction } from '@remix-run/node';

import { redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Heading } from '@chakra-ui/react';
import { prisma } from '~/db';

import Button from '~/components/button';

export const loader: LoaderFunction = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: post?.userId,
    },
  });

  if (!post)
    throw new Response('Not Found', {
      status: 404,
    });

  const data = { post, user };
  return data;
};

export const action: ActionFunction = async ({ params, request }) => {
  const form = await request.formData();
  if (form.get('_method') === 'delete') {
    const post = await prisma.post.findUnique({
      where: { id: params.postId },
    });

    if (!post) throw new Error('Post not found');

    await prisma.post.delete({ where: { id: params.postId } });
    return redirect('/posts');
  }
};

export function CatchBoundary() {
  return (
    <div>
      <h2>We couldn't find that page!</h2>
      <br />
      <Link to="/posts">
        <Button>Back to posts</Button>
      </Link>
    </div>
  );
}

export default function Post() {
  const {
    post,
    user: { username },
  } = useLoaderData();

  return (
    <div className="flex flex-col gap-4">
      <Heading>{post.title}</Heading>
      <div className="flex flex-col gap-1">
        <span>
          by <span className="text-brand-blue-500">{username}</span>
        </span>
        <span className="text-sm">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>
      <p
        style={{
          whiteSpace: 'pre-wrap',
        }}
      >
        {post.content}
      </p>
      <form method="POST">
        <input type="hidden" name="_method" value="delete" />
        <Button>Delete</Button>
      </form>
    </div>
  );
}

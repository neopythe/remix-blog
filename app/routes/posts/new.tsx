import type { ActionFunction } from '@remix-run/node';

import { json, redirect } from '@remix-run/node';
import { Heading } from '@chakra-ui/react';

import { prisma } from '~/db';
import { getUser } from '~/utils/session.server';

import NewPostForm from '~/components/new-post-form';

const validateContent = (content: string) => {
  if (typeof content !== 'string' || content.length < 10) {
    return 'Content should be at least 10 characters long';
  }
};

const validateTitle = (title: string) => {
  if (typeof title !== 'string' || title.length < 3) {
    return 'Title should be at least 3 characters long';
  }
  if (title.length > 100) {
    return 'Title may not be over 100 characters long';
  }
};

const badRequest = (data: {
  fieldErrors: { title?: string; content?: string };
  fields: { title: string; content: string };
}) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const title = String(form.get('title'));
  const content = String(form.get('content'));
  const user = await getUser(request);

  const fields = { title, content };

  const fieldErrors = {
    title: validateTitle(title),
    content: validateContent(content),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  if (user) {
    const post = await prisma.post.create({
      data: { ...fields, userId: user.id },
    });
    return redirect(`/posts/${post.id}`);
  }
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <section className="flex flex-col items-center gap-4">
      <Heading>Error</Heading>
      <pre className="whitespace-pre-wrap">{error.message}</pre>
    </section>
  );
};

export default function New() {
  return (
    <section className="flex flex-col items-center gap-4">
      <NewPostForm />
    </section>
  );
}

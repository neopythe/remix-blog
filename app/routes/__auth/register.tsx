import type { ActionFunction } from '@remix-run/node';

import { json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

import { prisma } from '~/db';
import { createUserSession, register } from '~/utils/session.server';

import Button from '../../components/button';

const validateUsername = (username: string) => {
  if (typeof username !== 'string' || username.length < 3) {
    return 'Username should be at least 3 characters long';
  }
};

const validatePassword = (password: string) => {
  if (typeof password !== 'string' || password.length < 12) {
    return 'Password should be at least 12 characters long';
  }
};

const badRequest = (data: {
  fieldErrors: { username?: string; password?: string; form?: string };
  fields: { username: string; password: string };
}) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = String(form.get('username'));
  const password = String(form.get('password'));

  const fields = { username, password };

  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }

  // check if user exists
  const userExists = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (userExists) {
    return badRequest({
      fields,
      fieldErrors: {
        username: `Sorry, the username "${username}" is unavailable`,
      },
    });
  }

  // create user
  const user = await register({ username, password });
  if (!user)
    return badRequest({
      fields,
      fieldErrors: { form: 'Something went wrong' },
    });

  // create user session
  return createUserSession(user.id, '/posts');
};

export default function Register() {
  const actionData = useActionData();

  return (
    <Form method="post" className="flex flex-col w-full gap-6">
      <Heading>Register</Heading>
      <FormControl
        as="fieldset"
        isRequired
        isInvalid={actionData?.fieldErrors?.username}
      >
        <FormLabel>Username</FormLabel>
        <Input name="username" type="text" />
        <FormErrorMessage>{actionData?.fieldErrors?.username}</FormErrorMessage>
      </FormControl>
      <FormControl
        as="fieldset"
        isRequired
        isInvalid={actionData?.fieldErrors?.password}
      >
        <FormLabel>Password</FormLabel>
        <Input name="password" type="password" />
        <FormErrorMessage>{actionData?.fieldErrors?.password}</FormErrorMessage>
      </FormControl>
      <Button>Submit</Button>
    </Form>
  );
}

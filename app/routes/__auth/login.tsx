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

import { createUserSession, login } from '~/utils/session.server';

import Button from '../../components/button';

const badRequest = (data: {
  fieldErrors: { credentials: string | undefined };
  fields: { username: string; password: string };
}) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = String(form.get('username'));
  const password = String(form.get('password'));

  const fields = { username, password };

  const fieldErrors = {
    credentials: 'Invalid credentials',
  };

  // find user
  const user = await login({ username, password });

  // check user
  if (!user)
    return badRequest({
      fields,
      fieldErrors,
    });

  // create user session
  return createUserSession(user.id, '/posts');
};

export default function Login() {
  const actionData = useActionData();

  return (
    <Form method="post" className="flex flex-col w-full gap-6">
      <Heading>Login</Heading>
      <FormControl as="fieldset" isRequired>
        <FormLabel>Username</FormLabel>
        <Input name="username" type="text" />
      </FormControl>
      <FormControl
        as="fieldset"
        isRequired
        isInvalid={actionData?.fieldErrors?.credentials}
      >
        <FormLabel>Password</FormLabel>
        <Input name="password" type="password" />
        <FormErrorMessage>
          {actionData?.fieldErrors?.credentials}
        </FormErrorMessage>
      </FormControl>
      <Button>Submit</Button>
    </Form>
  );
}

import { Form } from '@remix-run/react'
import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from '@chakra-ui/react'

import Button from './button'

export default function NewPostForm() {
  return (
    <>
      <Form method="post" className="flex flex-col w-full gap-6">
        <Heading>New Post</Heading>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input name="title" type="text" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Content</FormLabel>
          <Textarea name="content" height="24rem" resize="none" />
        </FormControl>
        <Button>Submit</Button>
      </Form>
    </>
  )
}

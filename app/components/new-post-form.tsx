import { Form } from '@remix-run/react'
import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'

import Button from './button'

export default function NewPostForm() {
  return (
    <Form method="post" className="flex flex-col w-full md:w-2/3 gap-4">
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
  )
}

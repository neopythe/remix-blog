import { useState } from 'react'
import { Form } from '@remix-run/react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from '@chakra-ui/react'

import Button from './button'

export default function NewPostForm() {
  const [input, setInput] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value)

  const isError = input.length > 100

  return (
    <Form method="post" className="flex flex-col w-full gap-6">
      <Heading>New Post</Heading>
      <FormControl isRequired isInvalid={isError}>
        <FormLabel>Title</FormLabel>
        <Input
          name="title"
          type="text"
          value={input}
          onChange={handleInputChange}
        />
        {isError && (
          <FormErrorMessage>
            Title may not be over 100 characters
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Content</FormLabel>
        <Textarea name="content" height="20rem" resize="none" />
      </FormControl>
      <Button isDisabled={isError}>Submit</Button>
    </Form>
  )
}

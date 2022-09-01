import { useState } from 'react';
import { Form } from '@remix-run/react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from '@chakra-ui/react';

import Button from './button';

export default function NewPostForm() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const isContentError = content.length < 10;
  const isTitleError = title.length < 3 || title.length > 100;

  return (
    <Form method="post" className="flex flex-col w-full gap-6">
      <Heading>New Post</Heading>
      <FormControl isRequired isInvalid={title.length > 0 && isTitleError}>
        <FormLabel>Title</FormLabel>
        <Input
          name="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        {title && isTitleError && (
          <FormErrorMessage>
            Title must be between 3 and 100 characters
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={content.length > 0 && isContentError}>
        <FormLabel>Content</FormLabel>
        <Textarea
          name="content"
          value={content}
          onChange={handleContentChange}
          height="20rem"
          resize="none"
        />
        {content && isContentError && (
          <FormErrorMessage>
            Content must be at least 10 characters
          </FormErrorMessage>
        )}
      </FormControl>
      <Button isDisabled={isContentError || isTitleError}>Submit</Button>
    </Form>
  );
}

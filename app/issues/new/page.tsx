'use client';

import 'easymde/dist/easymde.min.css';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';

import { Button, TextFieldInput, TextFieldRoot } from '@radix-ui/themes';

type NewIssue = {
  title: string;
  description: string;
};

type Props = {};

function NewIssuePage({}: Props) {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<NewIssue>();

  return (
    <form
      className='max-w-xl space-y-3'
      onSubmit={handleSubmit(async data => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      })}
    >
      <TextFieldRoot>
        <TextFieldInput placeholder='Title' {...register('title')} />
      </TextFieldRoot>
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder='Description' {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
}

export default NewIssuePage;

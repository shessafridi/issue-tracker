'use client';

import 'easymde/dist/easymde.min.css';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';
import SimpleMDE from 'react-simplemde-editor';
import z from 'zod';

import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button, CalloutIcon, CalloutRoot, CalloutText, Text, TextFieldInput, TextFieldRoot
} from '@radix-ui/themes';

type IssueForm = z.infer<typeof createIssueSchema>;

type Props = {};

function NewIssuePage({}: Props) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [error, setError] = useState('');

  return (
    <form
      className='max-w-xl space-y-3'
      onSubmit={handleSubmit(async data => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch (error) {
          setError('An unexpected error occured.');
        }
      })}
    >
      {error && (
        <CalloutRoot color='red'>
          <CalloutIcon>
            <BiErrorCircle />
          </CalloutIcon>
          <CalloutText>{error}</CalloutText>
        </CalloutRoot>
      )}
      <TextFieldRoot>
        <TextFieldInput placeholder='Title' {...register('title')} />
      </TextFieldRoot>
      {errors.title && (
        <Text color='red' as='p'>
          {errors.title.message}
        </Text>
      )}

      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder='Description' {...field} />
        )}
      />
      {errors.description && (
        <Text color='red' as='p'>
          {errors.description.message}
        </Text>
      )}

      <Button>Submit New Issue</Button>
    </form>
  );
}

export default NewIssuePage;

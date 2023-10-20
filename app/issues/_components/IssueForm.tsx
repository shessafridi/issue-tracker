'use client';

import 'easymde/dist/easymde.min.css';

import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';
import z from 'zod';

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import {
  Button,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  TextFieldInput,
  TextFieldRoot,
} from '@radix-ui/themes';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,

    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const [error, setError] = useState('');

  const onSubmit = handleSubmit(async data => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError('An unexpected error occured.');
    }
  });

  return (
    <form className='max-w-xl space-y-3' onSubmit={onSubmit}>
      {error && (
        <CalloutRoot color='red'>
          <CalloutIcon>
            <BiErrorCircle />
          </CalloutIcon>
          <CalloutText>{error}</CalloutText>
        </CalloutRoot>
      )}
      <TextFieldRoot>
        <TextFieldInput
          defaultValue={issue?.title}
          placeholder='Title'
          {...register('title')}
        />
      </TextFieldRoot>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>

      <Controller
        name='description'
        control={control}
        defaultValue={issue?.description}
        render={({ field: { ref, ...others } }) => (
          <Suspense>
            <SimpleMDE placeholder='Description' {...others} />
          </Suspense>
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Button disabled={isSubmitting}>
        Submit New Issue
        {isSubmitting && <Spinner className='h-4 w-4 border-2' />}
      </Button>
    </form>
  );
}

export default IssueForm;

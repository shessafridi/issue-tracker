'use client';

import 'easymde/dist/easymde.min.css';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BiErrorCircle } from 'react-icons/bi';
import SimpleMDE from 'react-simplemde-editor';

import {
    Button, CalloutIcon, CalloutRoot, CalloutText, TextFieldInput, TextFieldRoot
} from '@radix-ui/themes';

type NewIssue = {
  title: string;
  description: string;
};

type Props = {};

function NewIssuePage({}: Props) {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<NewIssue>();

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

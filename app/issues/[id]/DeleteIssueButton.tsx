'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ButtonSpinner } from '@/app/components';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Flex,
} from '@radix-ui/themes';

function DeleteIssueButton({ issueId }: { issueId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete('/api/issues/' + issueId);
      setError(false);

      router.push('/issues');
      router.refresh();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertDialogRoot open={error}>
        <AlertDialogContent>
          <AlertDialogTitle>Error</AlertDialogTitle>
          <AlertDialogDescription>
            This issue cannot be deleted.
          </AlertDialogDescription>
          <Button
            mt='2'
            variant='soft'
            color='gray'
            onClick={() => setError(false)}
          >
            Ok
          </Button>
        </AlertDialogContent>
      </AlertDialogRoot>

      <AlertDialogRoot>
        <AlertDialogTrigger>
          <Button disabled={loading} color='red'>
            Delete Issue
            {loading && <ButtonSpinner />}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialogDescription>

          <Flex mt='4' gap='3'>
            <AlertDialogCancel>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction>
              <Button color='red' onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialogAction>
          </Flex>
        </AlertDialogContent>
      </AlertDialogRoot>
    </>
  );
}

export default DeleteIssueButton;

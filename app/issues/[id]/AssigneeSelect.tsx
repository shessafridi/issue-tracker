'use client';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import { Skeleton } from '@/app/components';
import userService from '@/lib/api/user-service';
import { Issue } from '@prisma/client';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';

function AssigneeSelect({ issue }: { issue: Issue }) {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    staleTime: 60 * 1000,
    queryFn: userService.getUsers,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const handleAssignUser = (userId: string): void => {
    axios
      .patch('/api/issues/' + issue.id, {
        assignedToUserId: userId === 'un-assigned' ? null : userId,
      })
      .catch(() => toast.error('User could not be assigned.'));
  };

  return (
    <>
      <SelectRoot
        defaultValue={issue.assignedToUserId || 'un-assigned'}
        onValueChange={handleAssignUser}
      >
        <SelectTrigger placeholder='Assign...' />
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Suggestions</SelectLabel>
            <SelectItem value='un-assigned'>Unassigned</SelectItem>
            {users?.map(user => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
      <Toaster />
    </>
  );
}

export default AssigneeSelect;

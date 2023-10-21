'use client';
import axios from 'axios';

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

  return (
    <SelectRoot
      defaultValue={issue.assignedToUserId || 'un-assigned'}
      onValueChange={userId => {
        axios.patch('/api/issues/' + issue.id, {
          assignedToUserId: userId === 'un-assigned' ? null : userId,
        });
      }}
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
  );
}

export default AssigneeSelect;

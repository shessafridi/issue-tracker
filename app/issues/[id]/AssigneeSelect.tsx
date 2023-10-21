'use client';
import { Skeleton } from '@/app/components';
import userService from '@/lib/api/user-service';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';

type Props = {};

function AssigneeSelect({}: Props) {
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
    <SelectRoot>
      <SelectTrigger placeholder='Assign...' />
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Suggestions</SelectLabel>
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

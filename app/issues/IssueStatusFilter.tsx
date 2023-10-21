'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Status } from '@prisma/client';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@radix-ui/themes';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

type Props = {};

function IssueStatusFilter({}: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  return (
    <SelectRoot
      defaultValue={searchParams.get('status') || 'all'}
      onValueChange={status => {
        const params = new URLSearchParams(searchParams);

        params.set('status', status);
        params.set('page', '1');

        if (status === 'all') params.delete('status');

        const query = params.size ? '?' + params.toString() : '';
        router.push('/issues/' + query);
      }}
    >
      <SelectTrigger placeholder='Filter by status...' />
      <SelectContent>
        {statuses.map(status => (
          <SelectItem key={status.label} value={status.value || 'all'}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

export default IssueStatusFilter;

'use client';

import { useRouter } from 'next/navigation';

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

  return (
    <SelectRoot
      onValueChange={status => {
        const query = status && status !== 'all' ? `?status=${status}` : '';
        router.push(`/issues${query}`);
      }}
    >
      <SelectTrigger placeholder='Filter by status...' />
      <SelectContent>
        {statuses.map(status => (
          <SelectItem key={status.value} value={status.value || 'all'}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

export default IssueStatusFilter;

'use client';

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
  return (
    <SelectRoot value='all'>
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

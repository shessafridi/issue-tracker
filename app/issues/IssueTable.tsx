import NextLink from 'next/link';

import { Issue, Status } from '@prisma/client';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import {
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
  TableRowHeaderCell,
} from '@radix-ui/themes';

import { IssueStatusBadge, Link } from '../components';

export type IssueQuery = {
  status?: Status;
  orderBy?: keyof Issue;
  sortOrder?: 'asc' | 'desc';
  page?: string;
};

type Props = {
  issues: Issue[];
  searchParams: IssueQuery;
};

function IssueTable({ issues, searchParams }: Props) {
  const sortOrder = searchParams.sortOrder === 'desc' ? 'desc' : 'asc';

  const getNextSortOrder = (value: keyof Issue) =>
    value === searchParams.orderBy
      ? sortOrder === 'asc'
        ? 'desc'
        : 'asc'
      : 'asc';

  return (
    <TableRoot variant='surface'>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableColumnHeaderCell key={column.value}>
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    sortOrder: getNextSortOrder(column.value),
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy &&
                (sortOrder === 'asc' ? (
                  <ArrowUpIcon className='inline-block ml-1' />
                ) : (
                  <ArrowDownIcon className='inline-block ml-1' />
                ))}
            </TableColumnHeaderCell>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {issues.map(issue => (
          <TableRow key={issue.id}>
            <TableRowHeaderCell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className='block md:hidden'>
                <IssueStatusBadge status={issue.status} />
              </div>
            </TableRowHeaderCell>
            <TableCell className='hidden md:table-cell'>
              <IssueStatusBadge status={issue.status} />
            </TableCell>
            <TableCell className='hidden md:table-cell'>
              {issue.createdAt.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  );
}

const columns: {
  value: keyof Issue;
  label: string;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const columnNames = columns.map(c => c.value);

export default IssueTable;

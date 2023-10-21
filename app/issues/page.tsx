import NextLink from 'next/link';

import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
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

import IssueActions from './IssueActions';

type Props = {
  searchParams: {
    status?: Status;
    orderBy?: keyof Issue;
    sortOrder?: 'asc' | 'desc';
  };
};

async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status!)
    ? searchParams.status
    : undefined;

  const sortOrder = searchParams.sortOrder === 'desc' ? 'desc' : 'asc';

  const columns: { value: keyof Issue; label: string; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: columns.map(c => c.value).includes(searchParams.orderBy!)
      ? {
          [searchParams.orderBy!]: sortOrder,
        }
      : undefined,
  });

  return (
    <div>
      <IssueActions />

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
                      sortOrder:
                        column.value === searchParams.orderBy
                          ? sortOrder === 'asc'
                            ? 'desc'
                            : 'asc'
                          : 'asc',
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
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default IssuesPage;

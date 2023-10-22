import { Metadata } from 'next';

import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';

import Pagination from '../components/Pagination';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';

type Props = {
  searchParams: IssueQuery;
};

async function IssuesPage({ searchParams }: Props) {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status!)
    ? searchParams.status
    : undefined;

  const where = { status };

  const sortOrder = searchParams.sortOrder === 'desc' ? 'desc' : 'asc';

  const page = parseInt(searchParams.page!) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: columnNames.includes(searchParams.orderBy!)
      ? {
          [searchParams.orderBy!]: sortOrder,
        }
      : undefined,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        itemCount={issueCount}
        pageSize={pageSize}
      />
    </Flex>
  );
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issues',
  description: 'View all project issues',
};

export default IssuesPage;

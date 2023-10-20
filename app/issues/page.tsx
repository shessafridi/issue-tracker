import delay from 'delay';

import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
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

type Props = {};

async function IssuesPage({}: Props) {
  const issues = await prisma.issue.findMany();

  await delay(1000);

  return (
    <div>
      <IssueActions />

      <TableRoot variant='surface'>
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>
              Status
            </TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>
              Created
            </TableColumnHeaderCell>
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

export default IssuesPage;

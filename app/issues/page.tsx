import Link from 'next/link';

import prisma from '@/prisma/client';
import {
    Button, TableBody, TableCell, TableColumnHeaderCell, TableHeader, TableRoot, TableRow,
    TableRowHeaderCell
} from '@radix-ui/themes';

import IssueStatusBadge from '../components/IssueStatusBadge';

type Props = {};

async function IssuesPage({}: Props) {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className='mb-5'>
        <Link href='/issues/new'>
          <Button>New Issue</Button>
        </Link>
      </div>

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
                {issue.title}
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

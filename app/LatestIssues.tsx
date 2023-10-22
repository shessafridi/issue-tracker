import Link from 'next/link';

import prisma from '@/prisma/client';
import {
  Avatar,
  Card,
  Flex,
  Heading,
  TableBody,
  TableCell,
  TableRoot,
  TableRow,
  Tooltip,
} from '@radix-ui/themes';

import { IssueStatusBadge } from './components';

type Props = {};

async function LatestIssues({}: Props) {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { assignedToUser: true },
  });

  return (
    <Card>
      <Heading className='pl-2' size='4' mb='3' mt='2'>
        Latest Issues
      </Heading>
      <TableRoot>
        <TableBody>
          {issues.map(issue => (
            <TableRow key={issue.id}>
              <TableCell>
                <Flex justify='between' align='center'>
                  <Flex direction='column' align='start' gap='2'>
                    <Link href={'/issues/' + issue.id}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Tooltip
                      content={`Assigned to ${issue.assignedToUser.name}`}
                    >
                      <Avatar
                        fallback='?'
                        radius='full'
                        size='2'
                        src={issue.assignedToUser.image!}
                      />
                    </Tooltip>
                  )}
                </Flex>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Card>
  );
}

export default LatestIssues;

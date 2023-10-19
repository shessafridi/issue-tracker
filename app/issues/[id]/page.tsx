import { notFound } from 'next/navigation';

import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';

type Props = { params: { id: string } };

async function IssueDetailPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) return notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap='3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text className='text-gray-600 text-sm'>
          {issue.createdAt.toDateString()}
        </Text>
      </Flex>
      <Card>
        <Text as='p'>{issue.description}</Text>
      </Card>
    </div>
  );
}

export default IssueDetailPage;

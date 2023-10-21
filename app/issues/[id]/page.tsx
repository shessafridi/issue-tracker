import delay from 'delay';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

import authOptions from '@/app/api/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';

import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

type Props = { params: { id: string } };

async function IssueDetailPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: id } });

  const session = await getServerSession(authOptions);

  if (!issue) return notFound();

  await delay(1000);

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex gap='3' direction='column'>
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export default IssueDetailPage;

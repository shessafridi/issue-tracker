import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton';
import prisma from '@/prisma/client';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

type Props = {
  params: { id: string };
};

const fetchIssue = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

async function EditPage({ params: { id } }: Props) {
  const issue = await fetchIssue(id);

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(id);

  return {
    title: issue?.title ? `Edit issue - ${issue.title}` : 'Edit Issue',
    description: 'Edit issue ' + issue?.id,
  } as Metadata;
}

export default EditPage;

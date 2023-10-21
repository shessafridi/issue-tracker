import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton';
import prisma from '@/prisma/client';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

type Props = {
  params: { id: string };
};

async function EditPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: id } });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}

export default EditPage;

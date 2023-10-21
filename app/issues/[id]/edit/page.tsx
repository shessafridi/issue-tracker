import { notFound } from 'next/navigation';

import IssueForm from '@/app/issues/_components/IssueForm';
import prisma from '@/prisma/client';

type Props = {
  params: { id: string };
};

async function EditPage({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: id } });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}

export default EditPage;

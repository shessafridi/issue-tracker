import prisma from '@/prisma/client';

import IssueChart from './IssueChart';

export default async function Home() {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: 'OPEN' } }),
    prisma.issue.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.issue.count({ where: { status: 'CLOSED' } }),
  ]);

  return (
    <div>
      {/* <IssueSummary open={open} inProgress={inProgress} closed={closed} /> */}
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </div>
  );
}

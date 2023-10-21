import dynamic from 'next/dynamic';

import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

type Props = {};

function NewIssuePage({}: Props) {
  return <IssueForm />;
}

export default NewIssuePage;

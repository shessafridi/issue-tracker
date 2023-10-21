import Link from 'next/link';

import { Button, Flex } from '@radix-ui/themes';

import IssueStatusFilter from './IssueStatusFilter';

type Props = {};

function IssueActions({}: Props) {
  return (
    <Flex justify='between' className='mb-5'>
      <IssueStatusFilter />
      <Link href='/issues/new'>
        <Button>New Issue</Button>
      </Link>
    </Flex>
  );
}

export default IssueActions;

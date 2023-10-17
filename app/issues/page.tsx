import Link from 'next/link';

import { Button } from '@radix-ui/themes';

type Props = {};

function IssuesPage({}: Props) {
  return (
    <div>
      <Link href='/issues/new'>
        <Button>New Issue</Button>
      </Link>
    </div>
  );
}

export default IssuesPage;

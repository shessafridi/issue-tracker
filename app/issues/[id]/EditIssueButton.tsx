import Link from 'next/link';

import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

function EditIssueButton({ issueId }: { issueId: string }) {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button>
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  );
}

export default EditIssueButton;

import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';

type Props = {};

function IssueFormSkeleton({}: Props) {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Skeleton height='20rem' />
    </Box>
  );
}

export default IssueFormSkeleton;

import { cn } from '@/lib/utils';

import { Spinner } from './';

type Props = { className?: string };

function ButtonSpinner({ className }: Props) {
  return <Spinner className={cn('h-4 w-4 border-2', className)} />;
}

export default ButtonSpinner;
